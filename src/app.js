const express = require("express");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const auth = require("./middleware/auth");
const userRouter = require("./routers/users");
const peopleRouter = require("./routers/people");

app.use("/users", userRouter);
app.use("/people", auth, peopleRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Route not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;