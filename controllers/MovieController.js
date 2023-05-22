const MovieModel = require("../models/MovieModel");
const { validationResult } = require("express-validator");

class MovieController {
  async getAllMovies(req, res) {
    try {
      const results = await MovieModel.find();
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async getMovieById(req, res) {
    const movieId = req.params.id;
    try {
      const movie = await MovieModel.findById(movieId);
      if (movie) {
        res.status(200).send(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async addNewMovie(req, res) {
    const { title, description, genre_id } = req.body;
    const movie = { title, description, genre_id };
    try {
      const newMovie = await MovieModel.create(movie);
      if (newMovie) {
        res.status(201).send("Movie added successfully");
      } else {
        res.status(400).send("Failed to add movie");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async deleteMovie(req, res) {
    const movieId = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      try {
        const deletedMovie = await MovieModel.delete(movieId);
        if (deletedMovie) {
          res.status(200).send("Movie deleted successfully");
        } else {
          res.status(400).send("Failed to delete the movie");
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
    }
  }

  async updateMovie(req, res) {
    const { id, title, description } = req.body;
    try {
      const updatedMovie = await MovieModel.update(id, {
        title,
        description,
      });
      if (updatedMovie) {
        res.status(200).send("Movie updated successfully");
      } else {
        res.status(400).send("Failed to update movie");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
}

module.exports = MovieController;
