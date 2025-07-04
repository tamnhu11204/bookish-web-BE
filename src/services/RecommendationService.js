const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const FavoriteProduct = require('../models/FavoriteProductModel');
const Product = require('../models/ProductModel');

const getFavoriteGenre = async (userId) => {
  const genreCount = {};

  const orders = await Order.find({ user: userId }).populate('orderItems.product');
  console.log('Orders found:', orders.length);
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      if (item.product && item.product.genre) {
        const genre = item.product.genre;
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      }
    });
  });

  const favorites = await FavoriteProduct.find({ user: userId }).populate('product');
  console.log('Favorites found:', favorites.length);
  favorites.forEach(favorite => {
    if (favorite.product && favorite.product.genre) {
      const genre = favorite.product.genre;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    }
  });

  console.log('Genre count:', genreCount);
  return Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a])[0] || null;
};

const getRecommendations = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Không tìm thấy người dùng');
  }

  const favoriteGenre = await getFavoriteGenre(userId);
  console.log('Favorite genre:', favoriteGenre);
  if (!favoriteGenre) {
    console.log('No favorite genre found, returning popular books');
    return await Product.find().sort({ popularity: -1 }).limit(5); // Fallback: sách phổ biến
  }

  const orders = await Order.find({ user: userId }).populate('orderItems.product');
  const favorites = await FavoriteProduct.find({ user: userId }).populate('product');
  const purchasedBookIds = orders
    .flatMap(order => order.orderItems.map(item => item.product?._id?.toString()))
    .filter(id => id);
  const favoriteBookIds = favorites
    .map(favorite => favorite.product?._id?.toString())
    .filter(id => id);
  const excludeIds = [...new Set([...purchasedBookIds, ...favoriteBookIds])];
  console.log('Exclude IDs:', excludeIds);

  const recommendedBooksByGenre = await Product.find({
    genre: favoriteGenre,
    _id: { $nin: excludeIds },
  }).limit(5);
  console.log('Recommended by genre:', recommendedBooksByGenre.length);

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
  console.log('Recommended by author:', recommendedBooksByAuthor.length);

  const recommendations = [...recommendedBooksByGenre, ...recommendedBooksByAuthor];
  if (recommendations.length === 0) {
    console.log('No recommendations found, returning popular books');
    return await Product.find().sort({ popularity: -1 }).limit(5); // Fallback: sách phổ biến
  }

  return recommendations;
};

module.exports = {
  getRecommendations,
};