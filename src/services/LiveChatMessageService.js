const LiveChatMessage = require('../models/LiveChatMessageModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

const createMessage = async ({ sender, userId, message, isHandled = false, context = {}, platform = "website" }) => {
  const chatMessage = new LiveChatMessage({
    sender,
    message,
    user: userId,
    isHandled,
    context,
    platform
  });
  return await chatMessage.save();
};

const getMessagesByUser = async (userId) => {
  const messages = await LiveChatMessage.find({ user: userId }).sort({ timestamp: 1 });
  return { messages };
};

const getAllUsersWithLatestMessage = async () => {
  const latestMessages = await LiveChatMessage.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: '$user',
        latestMessage: { $first: '$message' },
        latestTimestamp: { $first: '$timestamp' },
        isHandled: { $first: '$isHandled' },
        context: { $first: '$context' },
        platform: { $first: '$platform' }
      },
    },
  ]);

  console.log('Latest Messages:', latestMessages);

  const populatedUsers = await Promise.all(
    latestMessages.map(async (item) => {
      let userInfo = null;
      if (mongoose.Types.ObjectId.isValid(item._id)) {
        try {
          userInfo = await User.findById(item._id).select('name');
        } catch (e) {
          console.log('Không tìm thấy user:', item._id);
        }
      }
      return {
        _id: item._id,
        name: userInfo?.name || (item._id.startsWith('guest_') ? 'Khách' : item._id),
        latestMessage: {
          content: item.latestMessage,
          timestamp: item.latestTimestamp,
          isHandled: item.isHandled,
          context: item.context,
          platform: item.platform
        },
      };
    })
  );

  return { users: populatedUsers };
};

const markHandled = async (messageId) => {
  return await LiveChatMessage.findByIdAndUpdate(
    messageId,
    { isHandled: true },
    { new: true }
  );
};

const requestSupport = async (userId, message = 'Yêu cầu hỗ trợ từ người dùng', context = {}, platform = "website") => {
  const chatMessage = new LiveChatMessage({
    sender: 'user',
    user: userId,
    message,
    isHandled: false,
    context,
    platform
  });
  return await chatMessage.save();
};

module.exports = {
  createMessage,
  getMessagesByUser,
  getAllUsersWithLatestMessage,
  markHandled,
  requestSupport,
};