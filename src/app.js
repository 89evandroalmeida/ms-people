const express = require("express");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const peopleRouter = require("./routers/people");

app.use("/people", peopleRouter);

module.exports = app;