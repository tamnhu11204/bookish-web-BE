const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Middleware xác thực cho admin
//set auth cho admin
const authMiddleWare = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  // verify a token symmetric
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication ",
      });
    }

    //nếu có user isAdmin
    if (user?.isAdmin) {
      console.log("true");
      next();
    } else {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication ",
      });
    }
  });
};

//set auth cho user lấy info của mình
const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  // verify a token symmetric
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication ",
      });
    }

    //nếu có user isAdmin
    if (user?.isAdmin || user?.id === userId)//=== thì cho đi tiếp 
    {
      console.log("true");
      next();
    } else {
      return res.status(404).json({
        status: "ERR",
        message: "The authentication ",
      });
    }
  });
};

const authUserMiddleWareOther = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  console.log('Received Token:', token);  // Log token nhận được
  const userId = req.params.user;

  if (!token) {
    return res.status(401).json({ status: "ERR", message: "Token missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      console.log('Error verifying token:', err);
      return res.status(401).json({
        status: "ERR",
        message: "The authentication failed.",
      });
    }

    if (user?.id === userId) {
      next();
    } else {
      return res.status(403).json({
        status: "ERR",
        message: "Forbidden",
      });
    }
  });
};



module.exports = {
  authMiddleWare,
  authUserMiddleWare,
  authUserMiddleWareOther
};