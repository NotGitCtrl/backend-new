const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const report = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  remarks: String,
  docs: Array,
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  phase: {
    type: Schema.Types.ObjectId,
    ref: "phases",
  },
  isHeiApproved: Boolean,
  approvedByHei: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isFaApproved: Boolean,
  approvedByFa: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  summary: String
});

module.exports = mongoose.model("report", report);
