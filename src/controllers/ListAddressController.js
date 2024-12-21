const Commune = require('../models/CommuneModel');
const District = require('../models/DistrictModel');
const Province = require('../models/ProvinceModel');
const User = require('../models/UserModel');
const ListAddressService = require('../services/ListAddressService');
const ListAddress = require('../models/ListAddressModel');  // Đảm bảo đúng đường dẫn tới mô-đun ListAddress


const createListAddress = async (req, res) => {
    try {
        const { phone, specificAddress, isDefault, user, province, district, commune } = req.body;

        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (!phone || !specificAddress || isDefault === undefined || !user || !province || !district || !commune) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        // Kiểm tra xem User ID có tồn tại không
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Người dùng không tồn tại!',
            });
        }

        // Kiểm tra xem Commune ID có tồn tại không
        const communeExists = await Commune.findById(commune);
        if (!communeExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Xã/Phường không tồn tại!',
            });
        }

        // Kiểm tra xem District ID có tồn tại không
        const districtExists = await District.findById(district);
        if (!districtExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Quận/Huyện không tồn tại!',
            });
        }

        // Kiểm tra xem Province ID có tồn tại không
        const provinceExists = await Province.findById(province);
        if (!provinceExists) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tỉnh/Thành phố không tồn tại!',
            });
        }

        // Kiểm tra xem người dùng đã có địa chỉ mặc định hay chưa
        if (isDefault) {
            // Kiểm tra xem người dùng đã có địa chỉ mặc định hay chưa
            const existingDefaultAddress = await ListAddress.findOne({ user: user, isDefault: true });

            // Nếu đã có địa chỉ mặc định, thì update địa chỉ cũ thành không mặc định
            if (existingDefaultAddress) {
                await ListAddress.updateOne(
                    { _id: existingDefaultAddress._id },
                    { isDefault: false }
                );
            }
        }

        // Tạo địa chỉ mới
        const newAddress = new ListAddress({
            phone,
            specificAddress,
            isDefault,
            user,
            province,
            district,
            commune,
        });

        await newAddress.save();

        return res.status(201).json({
            status: 'OK',
            message: 'Địa chỉ đã được thêm thành công.',
            data: newAddress,
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};


const updateListAddress = async (req, res) => {
    try {
        const { user, id } = req.params; // Lấy user và id từ URL
        const data = req.body;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The ListAddressID is required',
            });
        }

        // Kiểm tra xem ListAddress có tồn tại không
        const existingAddress = await ListAddress.findById(id);
        if (!existingAddress) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Địa chỉ không tồn tại!',
            });
        }

        // Kiểm tra xem user có khớp với địa chỉ không
        // if (existingAddress.user !== user) {
        //     return res.status(403).json({
        //         status: 'ERR',
        //         message: 'Không có quyền cập nhật địa chỉ của người dùng này!',
        //     });
        // }

        // Kiểm tra xem người dùng có địa chỉ mặc định hay không, nếu isDefault = true
        if (data.isDefault === true) {
            const existingDefaultAddress = await ListAddress.findOne({
                user: existingAddress.user,
                isDefault: true,
            });

            // Nếu đã có địa chỉ mặc định, thì update địa chỉ cũ thành không mặc định
            if (existingDefaultAddress && existingDefaultAddress._id.toString() !== id) {
                await ListAddress.updateOne(
                    { _id: existingDefaultAddress._id },
                    { isDefault: false }
                );
            }
        }

        // Cập nhật địa chỉ với dữ liệu mới
        const updatedAddress = await ListAddress.findByIdAndUpdate(id, data, {
            new: true,
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Địa chỉ đã được cập nhật thành công.',
            data: updatedAddress,
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};



const deleteListAddress = async (req, res) => {
    try {
        const ListAddressID = req.params.id
        if (!ListAddressID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ListAddressID is required'
            });
        }

        const response = await ListAddressService.deleteListAddress(ListAddressID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllListAddress = async (req, res) => {
    try {

        const user = req.params.user;

        if (!user) {
            return res.status(400).json({ status: 'ERR', message: 'User ID is required' });
        }

        const response = await ListAddressService.getAllListAddress(user);
        if (response.status === 'ERR') {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
};
  


const getDetailListAddress = async (req, res) => {
    try {
        const ListAddressID = req.params.id
        if (!ListAddressID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ListAddressID is required'
            });
        }
        const response = await ListAddressService.getDetailListAddress(ListAddressID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createListAddress, updateListAddress, deleteListAddress, getAllListAddress, getDetailListAddress };
