const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Middleware xác thực cho admin
const authMiddleWare = (req, res, next) => {
  //console.log("req", req);
  const authHeader = req.headers.token;
  //console.log("AUTH", authHeader);
  if (!authHeader) {
    return res.status(401).json({
      status: "ERR",
      message: "Access token is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: "ERR",
        message: "Invalid or expired access token",
      });
    }

    // Kiểm tra quyền admin
    if (user?.isAdmin) {
      console.log("Admin authentication successful");
      next();
    } else {
      return res.status(403).json({
        status: "ERR",
        message: "You are not authorized to perform this action",
      });
    }
  });
};

// Middleware xác thực cho user lấy thông tin cá nhân
const authUserMiddleWare = (req, res, next) => {
  // console.log("req.headers", req.headers);

  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      status: "ERR",
      message: "Access token is missing",
    });
  }

  const token = authHeader.split(" ")[1];
  const userId = req.params.id;

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "ERR",
        message: "Invalid or expired access token",
      });
    }

    // Kiểm tra quyền admin hoặc user truy cập đúng tài khoản của mình
    if (decoded?.isAdmin || decoded.id === userId) {
      console.log("User authentication successful");
      next();
    } else {
      return res.status(403).json({
        status: "ERR",
        message: "You are not authorized to access this resource",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};