const db = require("../config/dbConnect.js");

class GenreModel {
  static async getGenres() {
    const query = "SELECT * FROM genre";
    return new Promise((resolve) => {
      db.query(query, [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }

  static async getGenreMovies(genre) {
    const query = `SELECT movies.* FROM movies
      INNER JOIN movies_genre ON movies.id = movies_genre.movie_id
      INNER JOIN genre ON movies_genre.genre_id = genre.id
      WHERE genre.name = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [genre], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = GenreModel;
