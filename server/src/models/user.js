const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const permissionsSchema = mongoose.Schema({
  canHost: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true }
})

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permissions: { type: permissionsSchema },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
