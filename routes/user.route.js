const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router.route("/").post(userController.createUser).get(userController.getUsers);
router.route('/:email').get(userController.getUserByEmail).put(userController.updateUser)

module.exports = router;
