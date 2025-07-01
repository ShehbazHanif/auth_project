const Bid = require("../models/bidsModel");
const handleError = require("../utils/errorHandling");

// ========== CREATE / PLACE A BID ==========
const placeBid = async (req, res) => {
  try {
    const { projectId, developerId, bidAmount, message } = req.body;

    const bid = await Bid.create({ projectId, developerId, bidAmount, message });

    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      data: bid,
    });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== GET ALL BIDS ==========
const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate("projectId").populate("developerId");
    res.json({ success: true, data: bids });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== UPDATE A BID ==========
const updateBid = async (req, res) => {
  try {
    const updated = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ success: false, message: "Bid not found" });

    res.json({ success: true, message: "Bid updated", data: updated });
  } catch (err) {
    handleError(res, err, 500);
  }
};

// ========== DELETE A BID ==========
const deleteBid = async (req, res) => {
  try {
    const deleted = await Bid.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ success: false, message: "Bid not found" });

    res.json({ success: true, message: "Bid deleted" });
  } catch (err) {
    handleError(res, err, 500);
  }
};

module.exports = {
  placeBid,
  getAllBids,
  updateBid,
  deleteBid,
};
