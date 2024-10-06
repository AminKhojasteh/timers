const User = require("../models/usersModel");
const Timer = require("../models/timersModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = function (id) {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};

// login user
const loginUser = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credential." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credential." });
    }
    const token = createToken(user._id);
    res.status(200).json({ email, id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Please enter an valid email." });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 character and contians uppercase letters and numbers and special characters.",
    });
  }
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res
        .status(400)
        .json({ error: "This email has already registered." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: hashedPassword });
    const token = createToken(newUser._id);
    res.status(200).json({ email, id: newUser._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a user
const deleteUser = async function (req, res) {
  try {
    const userTimers = await Timer.deleteMany({ userId: req.userId });
    const deletedUser = await User.findByIdAndDelete(req.userId);
    res.status(200).json({ deletedUser, userTimers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, deleteUser };
