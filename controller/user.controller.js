const User = require("../model/User");

exports.createUser = async (req, res) => {
  const data = req.body;
  data.address = "";
  data.university = "";
  data.imageUrl = null;
  console.log(data);
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      const result = await User.create(data);
      res.status(200).json({
        status: "success",
        data: result,
        message: "User created successfully",
      });
    } else {
      res.status(200).json({
        status: "failed",
        data: user,
        message: "User already created",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await User.find({}).lean();
    res.status(200).json({
      status: "success",
      data: data,
      message: "Get users successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to get users",
      error: error.message,
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
      message: "User found successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to get user",
      error: error.message,
    });
  }
};

// Update user data by email
exports.updateUser = async (req, res) => {
  const { email } = req.params;
  const { name, address, university, imageUrl } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, address, university, imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to update user",
      error: error.message,
    });
  }
};
