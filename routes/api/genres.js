const express = require("express");
const genreController = require("../../controllers/GenreController.js");
const router = express.Router();
const { check } = require("express-validator");



router.get("/genre", genreController.getAllGenre);
module.exports = router;
router.get(
  "/genre/:genre/movies",
  [
    check("genre")
      .isString()
      .withMessage("Genre must be a string")
      .notEmpty()
      .withMessage("Genre is required"),
  ],
  genreController.getGenreMovies
);
