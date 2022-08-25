const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const projectProposal = new mongoose.Schema({
  name: String,
  description: String,
  docs: Array,
  link: String,
  isUGCApproved: Boolean,
  summary: String,
  scheme: {
    type: Schema.Types.ObjectId,
    ref: "scheme",
  },
  fundingAgency: {
    type: Schema.Types.ObjectId,
    ref: "fundingAgency",
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

module.exports = mongoose.model("projectProposal", projectProposal);
