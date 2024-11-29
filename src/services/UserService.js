const User = require('../models/UserModel');
const bcrypt=require ("bcrypt")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, name, password, phone, img, birthday, active, isAdmin, gender } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            console.log('hash', hash)
            const createdUser = await User.create({
                email,
                name,
                password: hash,
                phone,
                img,
                birthday,
                active,
                isAdmin,
                gender
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
        const { email, name, password, phone, img, birthday, active, isAdmin, gender } = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const comparePassword=bcrypt.compareSync(password,checkUser.password)
            console.log('comparePassword', comparePassword)
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The password or user is incorrect',
                    data: createdUser
                });
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: checkUser
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { createUser, loginUser };
