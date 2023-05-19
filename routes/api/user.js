const express = require("express");
const userController = require("../../controllers/UserController.js");
const router = express.Router();
const { check } = require("express-validator");
const reviewController = require("../../controllers/ReviewController.js");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/users", verifyJWT, userController.getAllUsers);
router.get("/users/:id", verifyJWT, userController.getUserById);
router.post("/users", verifyJWT, userController.addNewUser);
router.delete(
  "/users",
  verifyJWT,
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("invalid data type"),
  ],
  userController.deleteUserById
);
router.put("/users", verifyJWT, userController.updateUser);
router.get("/users/:id/reviews", verifyJWT, reviewController.getUserReviews);
module.exports = router;
