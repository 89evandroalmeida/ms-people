const mongoose = require("mongoose");

const database = process.env.MONGODB_DATABASE;
const server = process.env.MONGODB_SERVER;
const port = process.env.MONGODB_PORT;

module.exports = {  
    init: () => {
      const connString = `mongodb://${server}:${port}/${database}?retryWrites=true&w=majority`;
      console.log(connString);
      mongoose
        .connect(
          connString,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false,
            // useCreateIndex: true,
          }
        )
        .then((res) => console.log(`Connection Succesful ${res}`))
        .catch((err) => console.log(`Error in DB connection ${err}`));
    },
  };
  