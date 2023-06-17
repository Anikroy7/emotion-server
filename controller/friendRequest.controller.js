const FriendRequest = require("../model/FriendRequest");

// Create a friend request
exports.createFriendRequest =
  ("/friendRequest",
  async (req, res) => {
    try {
      const { sender, recipient } = req.body;
      const request = await FriendRequest.findOne({ sender, recipient });

      if (!request) {
        const friendRequest = new FriendRequest({ sender, recipient });
        await friendRequest.save();
        res.status(201).json(friendRequest);
      }else{
        res.status(500).json({
          message: "Request Already added!!",
        });
      }

    } catch (error) {
      res.status(500).json({
        error: "An error occurred while creating the friend request.",
      });
    }
  });

// Get all friend requests
exports.getFriendRequests =
  ("/friendRequest",
  async (req, res) => {
    try {
      const friendRequests = await FriendRequest.find()
        .populate("sender", "name imageUrl")
        .populate("recipient", "name imageUrl");

      res.json(friendRequests);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the friend requests.",
      });
    }
  });

// Get a specific friend request by ID
exports.getFriendRequestById =
  ("/friendRequest/:id",
  async (req, res) => {
    try {
      const friendRequest = await FriendRequest.findById(req.params.id);

      if (!friendRequest) {
        return res.status(404).json({ error: "Friend request not found." });
      }

      res.json(friendRequest);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the friend request.",
      });
    }
  });

// Update a friend request's status
exports.updateFriendRequest =
  ("/friendRequest/:id",
  async (req, res) => {
    try {
      const friendRequest = await FriendRequest.findById(req.params.id);

      if (!friendRequest) {
        return res.status(404).json({ error: "Friend request not found." });
      }

      friendRequest.status = req.body.status;
      await friendRequest.save();

      res.json(friendRequest);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while updating the friend request.",
      });
    }
  });

// Delete a friend request
exports.deleteFriendRequest =
  ("/friendRequest/:id",
  async (req, res) => {
    try {
      const friendRequest = await FriendRequest.findByIdAndDelete(
        req.params.id
      );

      if (!friendRequest) {
        return res.status(404).json({ error: "Friend request not found." });
      }

      res.json({ message: "Friend request deleted successfully." });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while deleting the friend request.",
      });
    }
  });
