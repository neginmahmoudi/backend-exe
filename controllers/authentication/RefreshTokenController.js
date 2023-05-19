const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');


const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required.' });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await UserModel.getUserById(decoded.id);
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token.' });
    }

const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

res.json({ accessToken });
} catch (err) {
res.status(500).json({ message: err.message });
}
};

module.exports = { refreshToken };