const mongoose = require("mongoose");
const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  permissions: [String],
});

module.exports = mongoose.model("role", Role);
