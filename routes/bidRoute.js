const express = require("express");
const bidRouter = express.Router();
const { placeBid } = require("../controllers/bidController");

// Developer places a bid
router.post("/place", placeBid);

module.exports = bidRouter;
