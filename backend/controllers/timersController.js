const Timer = require("../models/timersModel");
const mongoose = require("mongoose");

// get all timers
const getAllTimers = async function (req, res) {
  try {
    const allTimers = await Timer.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(allTimers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single timer
const getTimer = async function (req, res) {
  const timerId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(timerId)) {
    return res.status(404).json({ error: "Sent id is not valid." });
  }
  try {
    const selectedTimer = await Timer.findById(timerId);
    if (!selectedTimer) {
      return res.status(404).json({ error: "There is no such timer." });
    }
    console.log(req.userId);
    console.log(selectedTimer.userId);
    if (selectedTimer.userId !== req.userId) {
      return res
        .status(400)
        .json({ error: "This timer doesn't belong to you." });
    }
    res.status(200).json(selectedTimer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a new timer
const createTimer = async function (req, res) {
  // const { title } = req.body;
  // if (!title) {
  //   return res.status(400).json({ error: "every timer should have a title" });
  // }
  try {
    // const existedTimer = await Timer.findOne({ title, userId: req.userId });
    // if (existedTimer) {
    //   return res.status(400).json({ error: "This timer already exist." });
    // }
    const newTimer = await Timer.create({
      title: "New Timer",
      userId: req.userId,
    });
    res.status(200).json(newTimer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a timer
const deleteTimer = async function (req, res) {
  const timerId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(timerId)) {
    return res.status(404).json({ error: "Sent id is not valid." });
  }
  try {
    const timer = await Timer.findById(timerId);
    if (!timer) {
      return res.status(404).json({ error: "There is no such timer." });
    }
    if (timer.userId !== req.userId) {
      return res
        .status(400)
        .json({ error: "This timer doesn't belong to you." });
    }
    const deletedTimer = await Timer.findByIdAndDelete(timerId);
    res.status(200).json(deletedTimer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a timer
const updateTimer = async function (req, res) {
  const timerId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(timerId)) {
    return res.status(404).json({ error: "Sent id is not valid." });
  }
  try {
    const timer = await Timer.findById(timerId);
    if (!timer) {
      return res.status(404).json({ error: "There is no such timer." });
    }
    if (timer.userId !== req.userId) {
      return res
        .status(400)
        .json({ error: "This timer doesn't belong to you." });
    }
    const updatedTimer = await Timer.findByIdAndUpdate(timerId, req.body);
    res.status(200).json({ ...updatedTimer.toJSON(), ...req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTimers,
  getTimer,
  createTimer,
  deleteTimer,
  updateTimer,
};
