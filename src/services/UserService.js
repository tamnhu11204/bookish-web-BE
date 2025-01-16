const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, name, password, phone, birthday, isAdmin } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Email đã tồn tại! Vui lòng dùng Email khác.'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            console.log('hash', hash)
            const createdUser = await User.create({
                email,
                name,
                password: hash,
                phone,
                birthday,
                isAdmin
            });
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: createdUser
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Email không tồn tại!'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            //console.log('comparePassword', comparePassword)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Mật khẩu không chính xác!',
                });
            }

            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            console.log('access_token', access_token)
            resolve({
                status: 'OK',
                message: 'Success',
                access_token,
                refresh_token
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkUser = await User.findOne({ _id: id })
            console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedUser
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkUser = await User.findOne({ _id: id })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = (isAdmin) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Nếu isAdmin được truyền là true hoặc false, lọc theo giá trị đó
            const filter = isAdmin !== undefined ? { isAdmin: isAdmin } : {};
            const allUser = await User.find(filter);
            resolve({
                status: 'OK',
                message: 'Get all user successfully',
                data: allUser
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.findOne({ _id: id })
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail user sucessfully',
                data: user
            });
        } catch (e) {
            reject(e);
        }
    });
};

const toggleActiveStatus = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User không tồn tại!');
        }

        user.active = !user.active; // Đảo ngược trạng thái active
        await user.save();

        return {
            status: 'OK',
            message: 'Cập nhật trạng thái active thành công!',
            user,
        };
    } catch (error) {
        throw new Error(error.message || 'Đã xảy ra lỗi khi cập nhật trạng thái user.');
    }
};

const resetPassword = (userId, oldPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm kiếm user theo ID
            const user = await User.findById(userId);
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'User không tồn tại!'
                });
                return;
            }

            // Kiểm tra mật khẩu cũ
            const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);
            if (!isPasswordMatch) {
                resolve({
                    status: 'ERR',
                    message: 'Mật khẩu cũ không chính xác!'
                });
                return;
            }

            // Hash mật khẩu mới
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            user.password = hashedPassword;

            // Lưu lại user với mật khẩu mới
            await user.save();

            resolve({
                status: 'OK',
                message: 'Đổi mật khẩu thành công!',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const filterUsers = async (filters) => {
    const query = {};
  
    if (filters.name) {
      query.name = { $regex: filters.name, $options: "i" }; 
    }
    if (filters.phone) {
      query.phone = { $regex: filters.phone, $options: "i" }; 
    }
    if (filters.email) {
      query.email = { $regex: filters.email, $options: "i" }; 
    }
    if (filters.isAdmin !== undefined) {
        query.isAdmin = filters.isAdmin; // So sánh trực tiếp với giá trị boolean
    }
  
    // Truy vấn dữ liệu từ database
    const users = await User.find(query);
    return users;
  };

module.exports = {
    createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser,
    toggleActiveStatus, resetPassword, filterUsers
};