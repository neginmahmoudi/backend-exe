const db = require("../utils/dbConnect.js");

class ReviewModel extends GenericModel {
  constructor() {
    super('reviews');
  }

  async getFoundReviewByMovieId(id) {
    const query = `SELECT reviews.id, reviews.content, reviews.movie_id, reviews.user_id, users.name FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.movie_id = ?`;
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

  async getFoundReviewByUserId(id) {
    const query = `SELECT reviews.id, reviews.content, reviews.movie_id, reviews.user_id FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.user_id = ?`;
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
}

module.exports = new ReviewModel();