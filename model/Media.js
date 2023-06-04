const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  reactions: {
    type: Number,
    default: 0,
  },
});

const Media = mongoose.model("Post", mediaSchema);

module.exports = Media;
