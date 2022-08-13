const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const report = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  remarks: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("report", report);
