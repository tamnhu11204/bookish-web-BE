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

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};