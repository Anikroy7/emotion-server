const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "name is too big"],
    minLength: [3, "name is too short"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
    },
    message: (props) => `Invalid email: ${props.value}`,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

module.export = User;
