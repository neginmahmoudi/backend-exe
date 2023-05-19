const db = require("../config/dbConnect.js");

class MovieModel {
  static async getMovies() {
    const query = "SELECT * FROM movies";
    return new Promise((resolve) => {
      db.query(query, [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }

  static async getMovieById(id) {
    const query = "SELECT * FROM movies WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async addMovie(title, description) {
    const query = "INSERT INTO movies (title, description) VALUES (?, ?)";
    return new Promise((resolve) => {
      db.query(query, [title, description], (error, result) => {
        if (!error) resolve(true);
        else resolve(false);
      });
    });
  }

  static async deleteMovie(id) {
    const query = "DELETE FROM movies WHERE id=?";
    return new Promise((resolve) => {
      db.query(query, [id], (error, result) => {
        if (error) resolve(false);
        else resolve(true);
      });
    });
  }

  static async editMovie(id, title, description) {
    const query = "UPDATE movies SET title=?, description=? WHERE id=?";
    return new Promise((resolve) => {
      db.query(query, [title, description, id], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
}

module.exports = MovieModel;
