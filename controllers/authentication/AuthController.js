const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/User');
const RefreshTokenModel = require('../../models/RefreshToken');

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await UserModel.getUserByName(name);
    if (!user) {
      return res.status(401).json({ message: 'Invalid name or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid name or password.' });
    }

    // access token
    const accessToken = jwt.sign(
      { id: user.id, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );

    //refresh token
    const refreshToken = jwt.sign(
      { id: user.id, name: user.name },
      process.env.REFRESH_TOKEN_SECRET
    );

  
    await RefreshTokenModel.saveRefreshToken(user.id, refreshToken);
    res.json({ accessToken, refreshToken });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { login };





