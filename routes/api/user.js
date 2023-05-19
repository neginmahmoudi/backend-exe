const express = require("express");
const userController = require("../../controllers/UserController.js");
const router = express.Router();
const { check } = require("express-validator");
const reviewController = require("../../controllers/ReviewController.js");

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.addNewUser);
router.delete(
  "/users",
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("invalid data type"),
  ],
  userController.deleteUserById
);
router.put("/users", userController.updateUser);
router.get("/users/:id/reviews", reviewController.getUserReviews);
module.exports = router;
