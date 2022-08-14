const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const transaction = new mongoose.Schema({
  name: String,
  createdAt: Date,
  amount: Number,
  utr: Number,
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

  //   docs: {
  //     type: Schema.Types.ObjectId,
  //     ref: "doc",
  //   },
});

module.exports = mongoose.model("transaction", transaction);
