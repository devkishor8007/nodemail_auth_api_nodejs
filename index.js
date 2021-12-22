const express = require("express");
const app = express();
require("./db");
const Auth = require("./router/auth.router");
require("dotenv").config();

const { json, urlencoded } = require("express");

// use middlware
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/auth", Auth);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening at the port ${PORT}`);
});
