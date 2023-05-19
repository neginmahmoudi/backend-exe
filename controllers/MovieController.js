const movieModel = require("../models/Movie.js");
const { validationResult } = require("express-validator");

class MovieController {
  static async getAllMovies(req, res) {
    let results = await movieModel.getMovies();
    if (results) res.send(results);
  }
 
  static async getMovieById(req, res) {
    const movieId = req.params.id;
    const movie = await movieModel.getMovieById(movieId);
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send("Movie not found");
    }
  }

  static async addNewMovie(req, res) {
    const { title, description, genre_id } = req.body;
    const movie = { title, description, genre_id };
    const newMovie = await movieModel.addNewMovie(movie);
    if (newMovie) {
      res.send("add successfully");
    } else res.send("some property missing");
  }

  static async deleteMovie(req, res) {
    const movieId = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      if (movieId) {
        const deletedMovie = await movieModel.deleteMovie(movieId);
        if (deletedMovie) res.send("movie deleted succesfully.");
        else res.send("failed to delete the movie.");
      }
    }
  }

  static async updateMovie(req,res) {
    const { id } = req.body;
    const { title, description} = req.body;
    const updatedMovie = await movieModel.editMovie(id, title, description);
    if (updatedMovie) {
      res.send("user updated successfully");
    } else {
      res.send("failed to update user");
    }
  }

}

module.exports = MovieController;