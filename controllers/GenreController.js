const genreModel = require("../models/Genre.js");
const { validationResult } = require('express-validator');


class GenreController {
  
  static async getAllGenre(req, res) {
    const results = await genreModel.getGenres();
    if (results) res.send(results);
  }

  static async getGenreMovies(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const genre = req.params.genre;
    try {
      const movies = await genreModel.getGenreMovies(genre);
      res.status(200).send(movies);
    } catch (error) {
      res.status(500).send('An error occurred while fetching genre movies');
    }
  }

}

module.exports = GenreController;
