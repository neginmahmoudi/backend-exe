const db = require("../utils/dbConnect");

class RefreshTokenModel {
  static async getRefreshTokenByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT refresh_token FROM refresh_tokens WHERE user_id = ?";
      db.query(query, [userId], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length === 0) {
          resolve(null);
        } else {
          resolve(result[0].refresh_token);
        }
      });
    });
  }

  static async saveRefreshToken(userId, refreshToken) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO refresh_tokens (user_id, refresh_token) VALUES (?, ?)";
      db.query(query, [userId, refreshToken], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  static async deleteRefreshTokenByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM refresh_tokens WHERE user_id = ?";
      db.query(query, [userId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

static async updateRefreshToken(userId, refreshToken) {
    return new Promise((resolve, reject) => {
        // what is the column name 
      const query = "UPDATE users SET refresh_token = ? WHERE id = ?";
      db.query(query, [refreshToken, userId], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.affectedRows === 0) {
          resolve(null); // no user found with the given id
        } else {
          resolve(true);
        }
      });
    });
  }

}

module.exports = RefreshTokenModel;