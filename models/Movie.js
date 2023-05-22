const GenericModel = require('./GenericModel');
const db = require('../utils/dbConnect');

class MovieModel extends GenericModel {
  constructor() {
    super('movies');
  }
}

module.exports = new MovieModel();