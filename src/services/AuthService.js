const User = require("../models/UserModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");

// Quên mật khẩu
const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });
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
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "development" ? false : true,
      },
    });

    console.log(`Gửi OTP đến: ${email}, OTP: ${otp}`);

    const mailOptions = {
      from: `"Bookish xin chào" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Mã OTP để đặt lại mật khẩu",
      text: `Mã OTP của bạn là: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email OTP gửi thành công!");
      return { success: true, message: "OTP đã được gửi!" };
    } catch (emailError) {
      console.error("Lỗi khi gửi email:", emailError);
      throw new Error("Không thể gửi email OTP. Vui lòng thử lại.");
    }
  } catch (error) {
    console.error("Lỗi trong forgotPassword:", error);
    throw new Error(error.message);
  }
};

// Xác thực OTP
const verifyOTP = async (email, otp) => {
  try {
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log("User tìm thấy:", user);
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
    console.error("Lỗi trong verifyOTP:", error);
    throw new Error(error.message);
  }
};

// Đặt lại mật khẩu
const resetPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    user.userConfirmPassword = hashedPassword;

    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { success: true, message: "Đặt lại mật khẩu thành công!" };
  } catch (error) {
    console.error("Lỗi trong resetPassword:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  forgotPassword,
  verifyOTP,
  resetPassword,
};