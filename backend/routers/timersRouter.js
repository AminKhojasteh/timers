const express = require("express");
const {
  getAllTimers,
  getTimer,
  createTimer,
  deleteTimer,
  updateTimer,
} = require("../controllers/timersController");
const authorizationCheck = require("../middleware/authorizationCheck");

const router = express.Router();

router.use(authorizationCheck);

// GET all timers
router.get("/", getAllTimers);

// GET a single timer
router.get("/:id", getTimer);

// POST a new timer
router.post("/", createTimer);

// DELETE a timer
router.delete("/:id", deleteTimer);

// UPDATE a timer
router.patch("/:id", updateTimer);

module.exports = router;
