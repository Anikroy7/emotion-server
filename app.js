const express = require("express");
const cors = require('cors')
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());



// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
