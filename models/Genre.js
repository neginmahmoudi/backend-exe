const GenericModel = require("../models/AbstractModel");

class GenreModel extends GenericModel {
  constructor() {
    super("genre");
  }

  async getGenreMovies(genre) {
    const query = `SELECT movies.* FROM movies
      INNER JOIN movies_genre ON movies.id = movies_genre.movie_id
      INNER JOIN genre ON movies_genre.genre_id = genre.id
      WHERE genre.name = ?`;
    const [rows] = await db.execute(query, [genre]);
    return rows;
  }
}

module.exports = GenreModel;
