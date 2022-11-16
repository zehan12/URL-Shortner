const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
    {
        originslUrl: {
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
)