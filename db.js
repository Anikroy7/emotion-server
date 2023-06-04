const mongoose = require("mongoose");

const dbConnect = () => {
  return mongoose.connect(
    "mongodb+srv://roy645800:hTaZ1Ora3DM3EXzO@cluster0.gnzels9.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = dbConnect