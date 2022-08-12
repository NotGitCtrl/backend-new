const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const project = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  createdAt: Date,
  teamMembers: {
    type: Schema.Types.ObjectId,
    ref: "teammember",
  },
  phases: {
    type: Schema.Types.ObjectId,
    ref: "phase",
  },
  category: {
    type: String,
    enum: ["hardware", "software", "hybrid"],
  },
  scheme: {
    type: Schema.Types.ObjectId,
    ref: "scheme",
  },
  fundingAgency: {
    type: Schema.Types.ObjectId,
    ref: "fundingAgency",
  },
  hei: {
    type: Schema.Types.ObjectId,
    ref: "hei",
  },
});

module.exports = mongoose.model("project", project);

//Change Team members and phases
