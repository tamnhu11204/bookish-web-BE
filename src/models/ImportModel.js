//Lưu nhập hàng
const mongoose = require('mongoose');

const importSchema = new mongoose.Schema(
    {
        importItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                importPrice: { type: Number, required: true }, // Giá nhập của sản phẩm
                quantity: { type: Number, required: true }, // Số lượng nhập
            }
        ],
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier', // Tham chiếu đến model Supplier
            required: true
        },
        importDate: { 
            type: Date, 
            required: true, 
            default: Date.now // Ngày nhập hàng, mặc định là thời điểm hiện tại
        },
        totalImportPrice: { 
            type: Number, 
            required: true 
        }, // Tổng tiền nhập hàng
        note: { 
            type: String 
        }, // Ghi chú (không bắt buộc)
        status: { 
            type: String, 
            enum: ['pending', 'completed', 'canceled'], // Trạng thái nhập hàng
            default: 'pending' 
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }, // Người thực hiện nhập hàng
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

const Import = mongoose.model('Import', importSchema);
module.exports = Import;