const mongoose = require("mongoose");

const dbConnect = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.gnzels9.mongodb.net/?retryWrites=true&w=majority`
  );
};

module.exports = dbConnect