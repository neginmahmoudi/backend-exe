const reviewModel = require("../models/Review.js");
const { validationResult } = require("express-validator");
//add status 
class ReviewController {
  static async getAllReviews(req, res) {
    const results = await reviewModel.getReviews();
    if (results) res.send(results);
  }

  static async addNewReview(req, res) {
    const { content, user_id, movie_id } = req.body;
    const review = { content, user_id, movie_id };
    const newReview = await reviewModel.addNewReview(review);
    if (newReview) {
      res.send("added successfully");
    } else res.send("some property missing");
  }

  static async deleteReview(req, res) {
    const reviewId = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      if (reviewId) {
        const deletedReview = await reviewModel.deleteReview(reviewId);
        if (deletedReview) res.send("review deleted succesfully.");
        else res.send("failed to delete the review.");
      }
    }
  }

  static async updateReview() {
    const { id } = req.body;
    const { content, user_id, movie_id } = req.body;
    const updatedReview = await reviewModel.editReview(
      id,
      content,
      user_id,
      movie_id
    );
    if (updatedReview) {
      res.send("user updated successfully");
    } else {
      res.send("failed to update user");
    }
  }

  static async getUserReviews(req, res) {
    const userId = req.params.id;
    const reviews = await reviewModel.getFoundReviewByUserId(userId);
    if (reviews) {
      res.send(reviews);
    } else {
      res.status(404).send("Reviews not found");
    }
  }

  static async getMovieReviews(req, res) {
    const movieId = req.params.id;
    const reviews = await reviewModel.getFoundReviewByMovieId(movieId);
    if (reviews) {
      res.send(reviews);
    } else {
      res.status(404).send("Reviews not found");
    }
  }
}

module.exports = ReviewController;
