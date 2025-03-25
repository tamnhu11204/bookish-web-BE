const User = require("../models/UserModel");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Quên mật khẩu
const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email }); // Giữ nguyên email
    if (!user) {
      throw new Error("Email không tồn tại!");
    }

    const otp = crypto.randomInt(1000, 9999).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // 10 phút
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(`Gửi OTP đến: ${email}, OTP: ${otp}`);

    const mailOptions = {
      from: `"Bookish xin chào" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Mã OTP để đặt lại mật khẩu",
      text: `Mã OTP của bạn là: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP đã được gửi!" };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Xác thực OTP
const verifyOTP = async (email, otp) => {
  try {
    const user = await User.findOne({
      email, // Sửa từ userEmail thành email
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log("User tìm thấy:", user); // Debug
    console.log("OTP trong DB:", user?.resetPasswordOTP);
    console.log("Hạn OTP:", user?.resetPasswordExpires);

    if (!user) {
      throw new Error("OTP không hợp lệ hoặc đã hết hạn!");
    }

    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { success: true, message: "OTP hợp lệ!" };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Đặt lại mật khẩu
const resetPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email }); // Sửa từ userEmail thành email
    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.userConfirmPassword = hashedPassword;

    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { success: true, message: "Đặt lại mật khẩu thành công!" };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Đăng nhập bằng Google
const loginWithGoogle = async (token) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = Doctor.getPayload();
  const { email, name, picture } = payload;

  let user = await User.findOne({ email }); // Sửa từ userEmail thành email
  if (!user) {
    user = new User({
      email, // Sửa từ userEmail thành email
      userName: name,
      userImage: picture,
    });
    await user.save();
  }

  return { success: true, user };
};

// Đăng nhập bằng Facebook
const loginWithFacebook = async (token) => {
  const response = await axios.get(
    `https://graph.facebook.com/v12.0/me?fields=id,name,email,picture&access_token=${token}`
  );
  const { email, name, picture } = response.data;

  let user = await User.findOne({ email }); // Sửa từ userEmail thành email
  if (!user) {
    user = new User({
      email, // Sửa từ userEmail thành email
      userName: name,
      userImage: picture.data.url,
    });
    await user.save();
  }

  return { success: true, user };
};

module.exports = {
  forgotPassword,
  verifyOTP,
  resetPassword,
  loginWithGoogle,
  loginWithFacebook,
};