const express = require("express");
const movieController = require("../../controllers/MovieController.js");
const router = express.Router();
const { check } = require("express-validator");
const reviewController = require("../../controllers/ReviewController.js");

router.get("/movies", movieController.getAllMovies.bind(movieController));
router.get("/movies/:id", movieController.getMovieById.bind(movieController));
router.post("/movies", movieController.addNewMovie.bind(movieController));
router.delete(
  "/movies",
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("invalid data type"),
  ],
  movieController.deleteMovie.bind(movieController)
);
router.put("/movies", movieController.updateMovie.bind(movieController));
router.get("/movies/:id/reviews", reviewController.getMovieReviews.bind(reviewController));

module.exports = router;
