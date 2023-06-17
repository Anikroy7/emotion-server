const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user.route");
const mediaRouter = require("./routes/media.route");
const commentRouter = require("./routes/comments.route");
const friendRequestRouter = require("./routes/friendRequest.route");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/friendRequest", friendRequestRouter);


app.get("/", (req, res) => {
  res.send("Welcome to Emtion server");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(400).send({ message: "Something invalid occured" });
});

module.exports = app;
