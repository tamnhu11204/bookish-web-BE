const News = require('../models/NewsModel');
const NewsService = require('../services/NewsService');

// Tạo tin tức
// Tạo tin tức
const createNews = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, segments, author, category, source, publishDate, summary, tags, status } = req.body;

    if (!title?.trim() || !segments) {
      return res.status(400).json({ status: 'ERR', message: 'Thiếu tiêu đề hoặc nội dung!' });
    }

    // Parse segments từ JSON string
    let parsedSegments;
    try {
      parsedSegments = JSON.parse(segments);
      if (!Array.isArray(parsedSegments) || parsedSegments.length === 0 || parsedSegments.some(segment => !segment.content?.trim())) {
        return res.status(400).json({ status: 'ERR', message: 'Nội dung các đoạn không hợp lệ!' });
      }
    } catch (e) {
      return res.status(400).json({ status: 'ERR', message: 'Dữ liệu segments không hợp lệ!' });
    }

    // Tự động tạo mã tin tức mới (sử dụng NW thay vì A)
    const lastNews = await News.findOne().sort({ code: -1 }).select('code');
    let newCode = 'NW0001';
    if (lastNews && lastNews.code && /^NW\d{4}$/.test(lastNews.code)) {
      const lastNumber = parseInt(lastNews.code.slice(2));
      newCode = `NW${String(lastNumber + 1).padStart(4, '0')}`;
    }

    const newNewsData = {
      code: newCode,
      title,
      segments: parsedSegments,
      author: author || 'Admin',
      image: req.file ? req.file.path : null, // Cho phép không có ảnh
      category,
      source,
      summary,
      tags: tags ? JSON.parse(tags) : [], // Parse tags nếu gửi dưới dạng JSON
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      status: status || 'published',
    };

    const response = await NewsService.createNews(newNewsData);
    return res.status(201).json(response);
  } catch (e) {
    console.error("Error in createNews:", e.message);
    return res.status(500).json({
      status: 'ERROR',
      message: 'Error creating news',
      error: e.message,
    });
  }
};

// Cập nhật tin tức
const updateNews = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, segments, author, category, source, publishDate, summary, tags, status, existingImage } = req.body;

    // Kiểm tra title
    if (!title?.trim()) {
      return res.status(400).json({ status: "ERR", message: "Thiếu tiêu đề bài viết!" });
    }

    // Parse segments từ JSON string
    let parsedSegments;
    try {
      parsedSegments = segments ? JSON.parse(segments) : [];
      if (!Array.isArray(parsedSegments) || parsedSegments.length === 0 || parsedSegments.some(segment => !segment.content?.trim())) {
        return res.status(400).json({ status: "ERR", message: "Nội dung các đoạn không hợp lệ!" });
      }
      // Kiểm tra segment.title nếu bắt buộc
      if (parsedSegments.some(segment => !segment.title?.trim())) {
        return res.status(400).json({ status: "ERR", message: "Thiếu tiêu đề trong một số đoạn!" });
      }
    } catch (e) {
      return res.status(400).json({ status: "ERR", message: "Dữ liệu segments không hợp lệ!" });
    }

    // Kiểm tra publishDate
    if (!publishDate) {
      return res.status(400).json({ status: "ERR", message: "Thiếu ngày đăng!" });
    }

    // Sử dụng ảnh mới nếu có, nếu không giữ ảnh cũ
    const image = req.file ? req.file.path : existingImage;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        segments: parsedSegments,
        author: author || "Admin",
        image,
        category,
        source,
        summary,
        tags: tags ? JSON.parse(tags) : undefined,
        publishedAt: publishDate ? new Date(publishDate) : new Date(),
        status,
      },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ status: "ERR", message: "Không tìm thấy tin tức!" });
    }

    return res.status(200).json({
      status: "OK",
      message: "Cập nhật tin tức thành công!",
      data: updatedNews,
    });
  } catch (e) {
    console.error("Error in updateNews:", e.message);
    return res.status(500).json({
      status: "ERROR",
      message: "Error updating news",
      error: e.message,
    });
  }
};

// Xóa tin tức
const deleteNews = async (req, res) => {
  try {
    const newsID = req.params.id;
    if (!newsID) {
      return res.status(400).json({
        status: 'ERR',
        message: 'News ID is required',
      });
    }

    const response = await NewsService.deleteNews(newsID);
    if (response.message === 'News not found') {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Error deleting news',
      error: e.message,
    });
  }
};

// Lấy tất cả tin tức
const getAllNews = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await NewsService.getAllNews(
      Number(limit) || 10,
      Number(page) || 0,
      sort,
      filter
    );

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Error fetching news',
      error: e.message,
    });
  }
};

// Lấy chi tiết tin tức
const getDetailNews = async (req, res) => {
  try {
    const newsID = req.params.id;
    if (!newsID) {
      return res.status(400).json({
        status: 'ERR',
        message: 'News ID is required',
      });
    }

    const response = await NewsService.getDetailNews(newsID);
    if (!response.data) {
      return res.status(404).json({
        status: 'ERR',
        message: 'News not found',
      });
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Error fetching news details',
      error: e.message,
    });
  }
};

// Cập nhật lượt xem
const updateView = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Thiếu thông tin newsId.' });
    }

    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    news.view = (news.view || 0) + 1;
    await news.save();

    res.status(200).json({
      message: 'Cập nhật lượt xem thành công.',
      news,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getDetailNews,
  updateView
};
