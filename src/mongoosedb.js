const mongoose = require("mongoose");

const user = process.env.MONGODB_ADMINUSERNAME;
const password = process.env.MONGODB_ADMINPASSWORD;
const database = process.env.MONGODB_DATABASE;
const server = process.env.MONGODB_SERVER;
const port = process.env.MONGODB_PORT;

module.exports = {  
    init: () => {
      const connString = `mongodb://${user}:${password}@${server}:${port}/${database}?authSource=admin&retryWrites=true&w=majority`;
      mongoose
        .connect(
          connString,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        )
        .then((res) => console.log(`Connection Succesful ${res}`))
        .catch((err) => console.log(`Error in DB connection ${err}`));
    },
  };
  