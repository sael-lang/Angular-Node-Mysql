const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  data: Buffer,
  contentType: String,
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
