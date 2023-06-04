const User = require("../model/User");

exports.createUser = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findOne({ email: data.email });
    console.log(!user);
    if (!user) {
      const result = await User.create(data);
      res.status(200).json({
        status: "success",
        data: result,
        message: "User created successfully",
      });
    }
    res.status(200).json({
      status: "failed",
      data: user,
      message: "User already created",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to create user",
      error: error.message
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
