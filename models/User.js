const GenericModel = require("../models/AbstractModel");
const bcrypt = require("bcrypt");

class UserModel extends GenericModel {
  constructor() {
    super("users");
  }

  async getUserByName(name) {
    const query = "SELECT * FROM users WHERE name = ?";
    const [rows] = await db.execute(query, [name]);
    return rows.length > 0 ? rows[0] : null;
  }

  async createUser(name, password) {
    const userExists = await this.checkUserExists(name);

    if (userExists) {
      return null;
    }
    const hashedPassword = await this.hashPassword(password);
    const userId = await this.add({ name, password: hashedPassword });
    return { id: userId, name };
  }

  async checkUserExists(name) {
    const query = "SELECT id FROM users WHERE name = ?";
    const [rows] = await db.execute(query, [name]);
    return rows.length > 0;
  }

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}

module.exports = UserModel;
