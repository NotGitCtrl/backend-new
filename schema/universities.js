const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  name: String,
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  }
});

module.exports = mongoose.model("university", UniversitySchema);