const mongoose = require("mongoose");
const RegisteredUserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true },
  enrollmentNumber: { type: String, required: true },
});
exports.RegisteredUser = mongoose.model("RegisteredUser", RegisteredUserSchema);
