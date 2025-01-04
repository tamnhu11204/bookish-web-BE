const ListAddress = require('../models/ListAddressModel');

const createListAddress = async (newListAddress) => {
    const { phone, specificAddress, isDefault, user, province, district, commune } = newListAddress;
    try {
        const createdListAddress = await ListAddress.create({ phone, specificAddress, isDefault, user, province, district, commune });
        return {
            status: 'OK',
            message: 'Thêm địa chỉ mới thành công!',
            data: createdListAddress,
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const updateListAddress = async (id, data) => {
    try {
        const checkListAddress = await ListAddress.findById(id);
        if (!checkListAddress) {
            throw new Error('The ListAddress is not defined');
        }

        const updatedListAddress = await ListAddress.findByIdAndUpdate(id, data, { new: true });
        return {
            status: 'OK',
            message: 'Cập nhật địa chỉ thành công!',
            data: updatedListAddress,
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const deleteListAddress = async (id) => {
    try {
        const checkListAddress = await ListAddress.findById(id);
        if (!checkListAddress) {
            throw new Error('The ListAddress is not defined');
        }
        await ListAddress.findByIdAndDelete(id);
        return {
            status: 'OK',
            message: 'Xóa địa chỉ thành công!',
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getAllListAddress = async (user, isDefault) => {
    try {
        console.log('hi');

        // Build the query object dynamically
        const query = { user };

        // Add isDefault to query if it's provided
        if (isDefault !== undefined) {
            query.isDefault = isDefault;
        }

        const list = await ListAddress.find(query);

        if (list.length === 0) {
            return { status: 'ERR', message: 'No addresses found' };
        }

        return { status: 'OK', message: 'List retrieved successfully', data: list };
    } catch (error) {
        throw new Error(error.message);
    }
};



const getDetailListAddress = async (id) => {
    try {
        const listAddress = await ListAddress.findById(id);
        if (!listAddress) {
            throw new Error('The ListAddress is not defined');
        }

        return {
            status: 'OK',
            message: 'Lấy chi tiết địa chỉ thành công!',
            data: listAddress,
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = { createListAddress, updateListAddress, deleteListAddress, getAllListAddress, getDetailListAddress };
