const User = require('../models/UserModel');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, name, password, phone, img, birthday, active, isAdmin, gender } = newUser;

            const createdUser = await User.create({
                email,
                name,
                password,
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
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Failed to create user'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { createUser };
