const db = require("../utils/dbConnect.js");

class GenericModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    return new Promise((resolve, reject) => {
      db.query(query, [], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async add(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    return new Promise((resolve, reject) => {
      db.query(query, [data], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  async remove(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id=?`;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE id=?`;
    return new Promise((resolve, reject) => {
      db.query(query, [data, id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}

module.exports = GenericModel;
