
const userModel = require("../models/User.js");
const { validationResult } = require("express-validator");


class UserController {
  static async getAllUsers(req, res) {
    let results = await userModel.getUsers();
    if (results) res.send(results);
  }

  static async getUserById(req, res) {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user not found");
    }
  }

  static async addNewUser(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const newUser = await userModel.addUser(name, password);
    if (newUser) {
      res.status(200).send("add successfully");
    } else res.status(400).send("property missing");
  }

  static async deleteUserById(req, res) {
    const userId = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      if (userId) {
        const deletedUser = await userModel.deleteUser(userId);
        if (deletedUser) res.status(200).send("user deleted succesfully.");
        else res.status(400).send("failed to delete the user.");
      }
    }
  }

  static async updateUser(req,res) {
    const { id, name, password } = req.body;
    const updatedUser = await userModel.editUser(id, name, password);
    if (updatedUser) {
      res.status(200).send("user updated successfully");
    } else {
      res.status(400).send("failed to update user");
    }
  }

}

module.exports = UserController;
