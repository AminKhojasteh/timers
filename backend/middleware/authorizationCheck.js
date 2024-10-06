const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const authorizationCheck = async function (req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You are not authorized." });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ error: "You are not authorized." });
    }
    req.userId = user._id.valueOf();
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "You are not authorized." });
  }
};

module.exports = authorizationCheck;
