const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const billSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isApproved: Boolean,
  project:{
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  hei:{
    type: Schema.Types.ObjectId,
    ref: "hei",
  },
  approvedAmount: String,
  docs: Array,
  items: Array,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("bill", billSchema);
//projectid , heiid, faid , docs[], items[]