const mongoose = require('mongoose');

const communeSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        district: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'District', 
            required: true 
        }
    },
    {
        timestamps: true
    }
);

const Commune = mongoose.model('Commune', communeSchema);
module.exports = Commune;
