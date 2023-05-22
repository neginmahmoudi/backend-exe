const express = require("express");
const { check } = require("express-validator");

const reviewController = require("../../controllers/ReviewController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/", reviewController.getAllReviews.bind(reviewController));
router.post("/", verifyJWT, reviewController.addNewReview.bind(reviewController));
router.delete(
  "/",
  verifyJWT,
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("invalid data type"),
  ],
  reviewController.deleteReview.bind(reviewController)
);
router.put("/", verifyJWT, reviewController.updateReview.bind(reviewController));
router.get("/users/:id", reviewController.getUserReviews.bind(reviewController));
router.get("/movies/:id", reviewController.getMovieReviews.bind(reviewController));

module.exports = router;
