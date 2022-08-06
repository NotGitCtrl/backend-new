const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const HEI = new mongoose.Schema({
  name: String,
  address: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "district",
  },
  spoc: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  heiAdmin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: "university",
  },
  courses: Array,
  streams: [{
    type: Schema.Types.ObjectId,
    ref: "stream",
  }]
});

module.exports = mongoose.model("hei", HEI);
