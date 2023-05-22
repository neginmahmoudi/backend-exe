const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/User');
const RefreshTokenModel = require('../../models/RefreshToken');

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const userModel = new UserModel();
    const user = await userModel.getUserByName(name);
    if (!user) {
      return res.status(401).json({ message: 'Invalid name or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid name or password.' });
    }

    const accessToken = jwt.sign(
      { id: user.id, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, name: user.name },
      process.env.REFRESH_TOKEN_SECRET
    );

    const refreshTokenModel = new RefreshTokenModel();
    await refreshTokenModel.saveRefreshToken(user.id, refreshToken);
    res.json({ accessToken, refreshToken });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login };





  