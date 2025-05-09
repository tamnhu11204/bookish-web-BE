const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const FavoriteProduct = require('../models/FavoriteProductModel');
const Product = require('../models/ProductModel');

// Hàm đếm tần suất thể loại từ lịch sử mua hàng và danh sách yêu thích
const getFavoriteGenre = async (userId) => {
  const genreCount = {};

  // Lấy lịch sử mua hàng
  const orders = await Order.find({ user: userId }).populate('orderItems.product');
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      if (item.product && item.product.genre) {
        const genre = item.product.genre;
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      }
    });
  });

  // Lấy danh sách yêu thích
  const favorites = await FavoriteProduct.find({ user: userId }).populate('product');
  favorites.forEach(favorite => {
    if (favorite.product && favorite.product.genre) {
      const genre = favorite.product.genre;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    }
  });

  // Trả về thể loại phổ biến nhất
  return Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a])[0] || null;
};

// Hàm lấy danh sách sách gợi ý
const getRecommendations = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Không tìm thấy người dùng');
  }

  // Bước 1: Xác định thể loại yêu thích
  const favoriteGenre = await getFavoriteGenre(userId);
  if (!favoriteGenre) {
    return [];
  }

  // Bước 2: Lấy danh sách sách đã mua và yêu thích để loại trừ
  const orders = await Order.find({ user: userId }).populate('orderItems.product');
  const favorites = await FavoriteProduct.find({ user: userId }).populate('product');
  const purchasedBookIds = orders
    .flatMap(order => order.orderItems.map(item => item.product?._id?.toString()))
    .filter(id => id);
  const favoriteBookIds = favorites
    .map(favorite => favorite.product?._id?.toString())
    .filter(id => id);
  const excludeIds = [...new Set([...purchasedBookIds, ...favoriteBookIds])];

  // Bước 3: Tìm sách cùng thể loại, không nằm trong danh sách đã mua hoặc yêu thích
  const recommendedBooksByGenre = await Product.find({
    genre: favoriteGenre,
    _id: { $nin: excludeIds },
  }).limit(5);

  // Bước 4: Tìm sách từ cùng tác giả
  const favoriteAuthors = [
    ...new Set([
      ...orders.flatMap(order => order.orderItems.map(item => item.product?.author)).filter(Boolean),
      ...favorites.map(favorite => favorite.product?.author).filter(Boolean),
    ]),
  ];
  const recommendedBooksByAuthor = await Product.find({
    author: { $in: favoriteAuthors },
    _id: { $nin: excludeIds },
  }).limit(3);

  return [...recommendedBooksByGenre, ...recommendedBooksByAuthor];
};

module.exports = {
  getRecommendations,
};