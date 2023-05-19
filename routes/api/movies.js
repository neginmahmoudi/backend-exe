const express = require("express");
const moviesController = require("../../controllers/MovieController.js");
const router = express.Router();
const { check } = require("express-validator");
const reviewController = require("../../controllers/ReviewController.js");

router.get("/movies", moviesController.getAllMovies);
router.get("/movies/:id", moviesController.getMovieById);
router.post("/movies", moviesController.addNewMovie);
router.delete(
  "/movies",
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("invalid data type"),
  ],
  moviesController.deleteMovie
);
router.put("/movies", moviesController.updateMovie);
router.get("/movies/:id/reviews", reviewController.getMovieReviews);
module.exports = router;
