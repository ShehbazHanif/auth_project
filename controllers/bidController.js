const Bid = require("../models/bidModel");
const Project = require("../models/projectModel");

//  Developer places a bid on a project
const placeBid = async (req, res) => {
  try {
    const { projectId, developerId, bidAmount, message } = req.body;

    // ✅ Optional: Check if project exists and is open
    const project = await Project.findById(projectId);
    if (!project || project.status !== "open") {
      return res.status(400).json({ success: false, message: "Invalid or closed project." });
    }

    // ✅ Create the bid
    const bid = await Bid.create({ projectId, developerId, bidAmount, message });

    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      bid,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to place bid", error: err.message });
  }
};

module.exports = {
  placeBid,
};
