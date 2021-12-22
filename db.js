const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/loggeremail")
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((e) => {
    console.log("Mongodb is not connected");
  });
