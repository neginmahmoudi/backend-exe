const express = require("express");
const reviewController = require("../../controllers/ReviewController.js");
const router = express.Router();
const { check } = require("express-validator");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/reviews", reviewController.getAllReviews);
router.post("/reviews", verifyJWT, reviewController.addNewReview);
router.delete(
  "/reviews",
  verifyJWT,
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("invalid data type"),
  ],
  reviewController.deleteReview
);
router.put("/reviews", verifyJWT, reviewController.updateReview);
module.exports = router;
