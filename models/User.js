const db = require("../utils/dbConnect");
const bcrypt = require("bcrypt");

class UserModel {
  static async getUsers() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users";
      db.query(query, [], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getUserById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?";
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length === 0) {
          resolve(null);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getUserByName(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE name = ?";
      db.query(query, [name], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length === 0) {
          resolve(null);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
  
static async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE id = ?";
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  static async editUser(id, name, password) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET name = ?, password = ? WHERE id = ?";
      db.query(query, [name, password, id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  static async createUser(name, password) {
    const userExists = await checkUserExists(name);

    if (userExists) {
      return null;
    }
    const hashedPassword = await hashPassword(password);
    const userId = await addUser(name, hashedPassword);
    return { id: userId, name };
  }

}


async function checkUserExists(name) {
  const query = "SELECT id FROM users WHERE name = ?";
  const [rows] = await db.execute(query, [name]);
  return rows.length > 0;
}

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function addUser(name, hashedPassword) {
  const query = "INSERT INTO users (name, password) VALUES (?, ?)";
  const [result] = await db.execute(query, [name, hashedPassword]);
  return result.insertId;
}

module.exports = UserModel;
