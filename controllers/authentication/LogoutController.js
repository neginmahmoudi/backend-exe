const RefreshTokenModel = require('../../models/RefreshToken');

const logout = async (req, res) => {
  const { id } = req.user;

  try {
    await RefreshTokenModel.deleteRefreshTokenByUserId(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { logout };

  


