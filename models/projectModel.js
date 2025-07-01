const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({ 
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String, required: true }],
  estimatedBudget: { type: Number, required: true },
  status: {
    type: String,
    enum: ["open", "in progress", "completed"],
    default: "open",
  },
}, { timestamps: true });

module.exports = mongoose.model("projects", projectSchema);
