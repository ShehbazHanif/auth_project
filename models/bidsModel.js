const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  developerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "developers",
    required: true,
  },
  bidAmount: { type: Number, required: true },
  message: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("bids", bidSchema);
