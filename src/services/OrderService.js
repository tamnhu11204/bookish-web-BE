const Order = require("../models/OrderModel");

// Tạo sản phẩm
const createOrder = async (newOrder) => {
    try {
        const { 
            orderItems,
            phone,
            name,
            specificAddress,
            province,
            district,
            commune,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            discount,
            totalMoney,
            note,
            user,
            activeNow
         } = newOrder;


        // Tạo sản phẩm mới
        const createdOrder = await Order.create(newOrder);
        return {
            status: 'OK',
            message: 'newOrder created successfully',
            data: createdOrder,
        };
    } catch (e) {
        console.error('Error creating order:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error creating orderrr', error: e.message };
    }
};

const getAllOrder = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = userId ? { user: userId } : {}; // Nếu không có user, không lọc
            const allOrder = await Order.find(query);
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const order = await Order.findOne({ _id: id })
            if (order === null) {
                resolve({
                    status: 'OK',
                    message: 'The Order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Order sucessfully',
                data: order
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateActiveNow = async (orderId, data) => {
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        throw new Error('Order not found');
      }
  
      console.log('Received activeNow:', data);
  
      // Nếu data là một đối tượng, lấy khóa đầu tiên để làm giá trị activeNow
      const activeNowValue = Object.keys(data)[0];
  
      if (!activeNowValue) {
        throw new Error('Invalid data format');
      }
  
      // Cập nhật giá trị của activeNow
      order.activeNow = activeNowValue;
  
      await order.save();
  
      return order;
    } catch (error) {
      throw new Error('Error updating activeNow: ' + error.message);
    }
  };

  const updateIsCancel = async (orderId) => {
    try {
        // Tìm đơn hàng theo ID và cập nhật 'isCancel' thành true
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { isCancel: true },
            { new: true }  // Trả về đơn hàng đã được cập nhật
        );

        if (!updatedOrder) {
            throw new Error('Order not found');
        }

        return updatedOrder;
    } catch (error) {
        throw new Error(`Error updating 'isCancel': ${error.message}`);
    }
};
  
  
module.exports = {
    createOrder,getDetailOrder,getAllOrder,updateActiveNow,updateIsCancel
};
