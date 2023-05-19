const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403); 

    try {
      const user = await UserModel.getUserById(decoded.id);
      if (!user) return res.sendStatus(403);

      req.user = user.name;
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  });
};

module.exports = verifyJWT;
