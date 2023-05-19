const db = require("../config/dbConnect.js");

class ReviewModel {
  static async getReviews() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM reviews";
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async addReview(content, userId, movieId) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO reviews (content, user_id, movie_id) VALUES (?, ?, ?)";
      db.query(query, [content, userId, movieId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  static async deleteReview(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM reviews WHERE id = ?";
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  static async editReview(id, content, userId, movieId) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE reviews SET content = ?, user_id = ?, movie_id = ? WHERE id = ?";
      db.query(query, [content, userId, movieId, id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  static async getFoundReviewByMovieId(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT reviews.id, reviews.content, reviews.movie_id, reviews.user_id, users.name FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.movie_id = ?";
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getFoundReviewByUserId(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT reviews.id, reviews.content, reviews.movie_id, reviews.user_id FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.user_id = ?";
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

module.exports = ReviewModel;
