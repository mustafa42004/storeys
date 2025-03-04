require('../config/dataBase')
const mongoose = require("mongoose");


const teamSchema = new mongoose.Schema(
    {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        designation: { type: String, default: '' },
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() },
        profile: { 
            s3Url: { type: String, default: '' },
            s3Key: { type: String, default: '' },
        },
    },
    { collection: "team" }
);

module.exports = mongoose.model("team", teamSchema);
