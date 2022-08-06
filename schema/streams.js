const mongoose = require("mongoose");
const Stream = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  courses: Array,
});

module.exports = mongoose.model("stream", Stream);