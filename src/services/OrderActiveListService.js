const OrderActiveList = require('./../models/OrderActiveListModel');
const bcryptjs = require("bcryptjs");

const createOrderActiveList = (newOrderActiveList) => {
    return new Promise(async (resolve, reject) => {
        const { order, activeList } = newOrderActiveList;
        console.log('newOrderActiveList', newOrderActiveList)
        try {
            const checkOrderActiveList = await OrderActiveList.findOne({
                order: order
            })
            if (checkOrderActiveList !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Đơn hàng đã tồn tại! Vui lòng nhập tên khác.'
                })
            }
            const createdOrderActiveList = await OrderActiveList.create({ order, activeList });
            if (createdOrderActiveList) {
                resolve({
                    status: 'OK',
                    message: 'OrderActiveList created successfully',
                    data: createdOrderActiveList
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllOrderActiveList = async (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderActiveList = await OrderActiveList.find({ order: orderId });
            if (!orderActiveList) {
                reject(new Error("Không tìm thấy order active list cho order này"));
            } else {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: orderActiveList,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


const getDetailOrderActiveList = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const orderActiveList = await OrderActiveList.findOne({ _id: id })
            if (orderActiveList === null) {
                resolve({
                    status: 'OK',
                    message: 'The OrderActiveList is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail OrderActiveList sucessfully',
                data: orderActiveList
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateOrderActiveList = (orderId, newActive) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedOrderActiveList = await OrderActiveList.findOneAndUpdate(
                { order: orderId },  // Tìm đơn hàng theo orderId
                { $push: { activeList: newActive } },  // Thêm phần tử mới vào activeList
                { new: true }  // Trả về tài liệu đã được cập nhật
            );

            if (updatedOrderActiveList) {
                resolve({
                    status: 'OK',
                    message: 'OrderActiveList updated successfully',
                    data: updatedOrderActiveList,
                });
            } else {
                resolve({
                    status: 'ERR',
                    message: 'OrderActiveList not found!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = { updateOrderActiveList, getAllOrderActiveList, createOrderActiveList, getDetailOrderActiveList }