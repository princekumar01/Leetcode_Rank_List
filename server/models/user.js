const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  finish_time: { type: Number, required: true },
});

const RegisteredUserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String },
  gender: { type: String },
  enrollmentNumber: { type: String, required: true },
});

const AllcontestSchema = new mongoose.Schema({
  _id: String,
  rankings: [userSchema],
});

exports.Allcontest = mongoose.model("Allcontest", AllcontestSchema);
exports.RegisteredUser = mongoose.model("RegisteredUser", RegisteredUserSchema);
exports.User = mongoose.model("User", userSchema);
