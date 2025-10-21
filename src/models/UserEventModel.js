const mongoose = require('mongoose');

const userEventSchema = new mongoose.Schema({
  eventType: { type: String, required: true }, // ví dụ: 'view_book', 'add_to_cart'
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const UserEvent = mongoose.model('UserEvent', userEventSchema);
module.exports = UserEvent;

