const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    singleton: { type: String, default: 'config', unique: true },

    bannerImage1: { type: String },
    bannerImage2: { type: String },
    title: { type: String },
    description: { type: String },
    mission: { type: String },
    vision: { type: String },
    contacts: { type: String },

}, {
    timestamps: true,
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
module.exports = AboutUs;