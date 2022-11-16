const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
    {
        originalUrl: {
            type: String,
            unique: true,
            require: true
        },
        urlCode: {
            type: String,
            unique: true,
            require: true
        },
        shortUrl: {
            type: String,
            unique: true,
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Url", urlSchema);