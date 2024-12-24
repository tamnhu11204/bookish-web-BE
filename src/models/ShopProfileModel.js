const mongoose = require('mongoose');

const ShopProfileSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        slogan: { type: String, required: true },
        description: { type: String, default: '' },  
        phone: { type: String, required: true },
        logo: { type: String, required: true },
        province: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
            required: true
        },
        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
            required: true
        },
        commune: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commune',
            required: true
        },
        img: { type: [String], default: [] },
        specificAddress: { type: String, default: '' },
        facebook: { type: String, default: '' },
        insta: { type: String, default: '' },
        policy: { type: String, default: '' },
        instruction: { type: String, default: '' }
    },
    {
        timestamps: true
    }
);

const ShopProfile = mongoose.model('ShopProfile', ShopProfileSchema);
module.exports = ShopProfile;
