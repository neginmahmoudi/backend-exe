const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");

const register = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required." });
  }
  try {
    const userModel = new UserModel();
    const userExists = await userModel.checkUserExists(name);
    if (userExists) {
      return res.sendStatus(409);
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name, hashedPwd);
    if (!user) {
      return res.sendStatus(500);
    }

    res.status(201).json({ id: user.id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register };

