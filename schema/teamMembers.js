const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const teamMember = new mongoose.Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isLeader: {
    type: Boolean,
  },
});

module.exports = mongoose.model("team_members", teamMember);
