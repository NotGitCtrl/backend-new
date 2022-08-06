const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const DistrictSchema = new mongoose.Schema({
  name: String,
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  }
});

module.exports = mongoose.model("district", DistrictSchema);