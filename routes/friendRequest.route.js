const express = require("express");
const friendRequestController = require("../controller/friendRequest.controller");
const router = express.Router();

router
  .route("/")
  .get(friendRequestController.getFriendRequests)
  .post(friendRequestController.createFriendRequest);

router
  .route("/:id")
  .get(friendRequestController.getFriendRequestById)
  .put(friendRequestController.updateFriendRequest)
  .delete(friendRequestController.deleteFriendRequest);

module.exports = router;
