require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const timersRouter = require("./routers/timersRouter");
const usersRouter = require("./routers/usersRouter");

// express app
const app = express();

// middleware

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  console.log("request path: ", req.path);
  console.log("request method: ", req.method);
  next();
});

// routes
app.use("/users", usersRouter);
app.use("/timers", timersRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    // listen for requests
    app.listen(process.env.PORT, function () {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
