const News = require('../models/NewsModel');

// Tạo tin tức
const createNews = async (newNews) => {
  return new Promise(async (resolve, reject) => {
    const { code, title, segments, author, image, category, source, publishDate, summary, tags, status } = newNews;
    try {
      // Kiểm tra trùng lặp tiêu đề
      const checkNews = await News.findOne({ title });
      if (checkNews) {
        return resolve({
          status: 'ERR',
          message: 'Tên tin tức đã tồn tại, vui lòng nhập tên khác.',
        });
      }

      // Kiểm tra segments
      if (!Array.isArray(segments) || segments.length === 0 || segments.some(segment => !segment.content?.trim())) {
        return resolve({
          status: 'ERR',
          message: 'Nội dung các đoạn không hợp lệ!',
        });
      }

      const createdNews = await News.create({
        code,
        title,
        segments,
        author: author || 'Admin',
        image,
        category,
        source,
        summary,
        tags: tags || [],
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        status: status || 'published',
      });

      resolve({
        status: 'OK',
        message: 'Tạo tin tức thành công!',
        data: createdNews,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật tin tức
const updateNews = async (id, data) => {
    try {
        const news = await News.findByIdAndUpdate(id, data, { new: true });
        if (!news) {
            return {
                status: 'FAIL',
                message: 'News not found',
            };
        }
        return {
            status: 'OK',
            message: 'News updated successfully',
            data: news,
        };
    } catch (e) {
        console.error('Error updating news:', e);
        throw { status: 'ERROR', message: 'Error updating news', error: e.message };
    }
};

// Xóa tin tức
const deleteNews = async (id) => {
    try {
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return {
                status: 'FAIL',
                message: 'News not found',
            };
        }
        return {
            status: 'OK',
            message: 'News deleted successfully',
        };
    } catch (e) {
        console.error('Error deleting news:', e);
        throw { status: 'ERROR', message: 'Error deleting news', error: e.message };
    }
};

// Lấy tất cả tin tức (có phân trang, sắp xếp, lọc)
const getAllNews = async (limit = 10, page = 0, sort, filter) => {
    try {
        const query = {};

        // Lọc tin tức (theo category, author, source, title)
        if (filter && Array.isArray(filter) && filter.length === 2) {
            const [field, value] = filter;
            if (field === 'category' || field === 'author' || field === 'source') {
                query[field] = value;
            } else {
                query[field] = { $regex: value, $options: 'i' };
            }
        }

        // Sắp xếp
        let sortOption = {};
        if (sort) {
            const sortArray = typeof sort === 'string' ? JSON.parse(sort) : sort;
            if (Array.isArray(sortArray) && sortArray.length === 2) {
                sortOption[sortArray[0]] = sortArray[1];
            }
        }

        const totalNews = await News.countDocuments(query);
        const newsList = await News.find(query)
            .sort(sortOption)
            .skip(page * limit)
            .limit(limit);

        return {
            status: 'OK',
            message: 'News retrieved successfully',
            data: newsList,
            total: totalNews,
            pageCurrent: page + 1,
            totalPage: Math.ceil(totalNews / limit),
        };
    } catch (e) {
        console.error('SERVICE ERROR - getAllNews:', e);
        throw new Error(e.message);
    }
};

// Lấy chi tiết tin tức
const getDetailNews = async (id) => {
    try {
        const news = await News.findById(id);
        if (!news) {
            return {
                status: 'FAIL',
                message: 'News not found',
            };
        }

        return {
            status: 'OK',
            message: 'News details retrieved successfully',
            data: news,
        };
    } catch (e) {
        console.error('Error retrieving news details:', e);
        throw { status: 'ERROR', message: 'Error retrieving news details', error: e.message };
    }
};

module.exports = {
    createNews,
    updateNews,
    deleteNews,
    getAllNews,
    getDetailNews,
};
