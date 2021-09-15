require('dotenv').config()

const app = require("./app");
const db = require("./mongoosedb");

db.init();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("GET / OK")
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});