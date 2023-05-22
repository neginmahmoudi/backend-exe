const ReviewModel = require("../models/Review");
const { validationResult } = require("express-validator");

class ReviewController {
  async getAllReviews(req, res) {
    try {
      const results = await ReviewModel.find();
      res.send(results);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async addNewReview(req, res) {
    const { content, user_id, movie_id } = req.body;
    const review = { content, user_id, movie_id };
    try {
      const newReview = await ReviewModel.create(review);
      if (newReview) {
        res.send("Review added successfully");
      } else {
        res.status(400).send("Failed to add review");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async deleteReview(req, res) {
    const reviewId = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      try {
        const deletedReview = await ReviewModel.delete(reviewId);
        if (deletedReview) {
          res.send("Review deleted successfully.");
        } else {
          res.status(400).send("Failed to delete the review.");
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
    }
  }

  async updateReview(req, res) {
    const { id, content, user_id, movie_id } = req.body;
    try {
      const updatedReview = await ReviewModel.update(id, {
        content,
        user_id,
        movie_id,
      });
      if (updatedReview) {
        res.send("Review updated successfully");
      } else {
        res.status(400).send("Failed to update review");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async getUserReviews(req, res) {
    const userId = req.params.id;
    try {
      const reviews = await ReviewModel.getFoundReviewByUserId(userId);
      if (reviews) {
        res.send(reviews);
      } else {
        res.status(404).send("Reviews not found");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  async getMovieReviews(req, res) {
    const movieId = req.params.id;
    try {
      const reviews = await ReviewModel.getFoundReviewByMovieId(movieId);
      if (reviews) {
        res.send(reviews);
      } else {
        res.status(404).send("Reviews not found");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
}

module.exports = ReviewController;
