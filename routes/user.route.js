const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getUsers);

module.exports = router;
