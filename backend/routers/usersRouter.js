const express = require("express");
const {
  loginUser,
  signupUser,
  deleteUser,
} = require("../controllers/usersController");
const authorizationCheck = require("../middleware/authorizationCheck");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// delete route
router.delete("/delete", authorizationCheck, deleteUser);

module.exports = router;
