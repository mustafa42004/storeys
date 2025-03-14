require('../config/dataBase')
const mongoose = require("mongoose");


const communitySchema = new mongoose.Schema(
    {
        title: { type: String, default: '' },
        content: { type: String, default: '' },
        status: { type: String, default: '' },
        permalink: { type: String, default: '', unique: true },
        banner: { 
            s3Url: { type: String, default: '' },
            s3Key: { type: String, default: '' },
        },
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() },
    },
    { collection: "community" }
);

module.exports = mongoose.model("community", communitySchema);
