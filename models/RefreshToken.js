const GenericModel = require("../models/AbstractModel");

class RefreshTokenModel extends GenericModel {
  constructor() {
    super("refresh_tokens");
  }

  async getRefreshTokenByUserId(userId) {
    const query = "SELECT refresh_token FROM refresh_tokens WHERE user_id = ?";
    const [rows] = await db.execute(query, [userId]);
    return rows.length > 0 ? rows[0].refresh_token : null;
  }
}

module.exports = RefreshTokenModel;

