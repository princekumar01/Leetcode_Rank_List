const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
    _id: String,
    username:String,
    score:Number,
    finish_time:Number,
    rank: Number,
});
const ContestSchema = new Schema({
    _id: String,
    title: String,
    startTime: Date,
    lastUpdated: {
        type: Number,
        default:0,
    },
    rankings: [rankingSchema],
});

exports.Contest = mongoose.model("Contest", ContestSchema);