const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { bidSchema } = require("../validation/bidValidation");
const {
  placeBid,
  getAllBids,
  updateBid,
  deleteBid,
} = require("../controllers/bidController");

// CREATE
router.post("/place", validate(bidSchema), placeBid);

// READ ALL
router.get("/", getAllBids);



// UPDATE
router.patch("/:id", updateBid);

// DELETE
router.delete("/:id", deleteBid);

module.exports = router;
