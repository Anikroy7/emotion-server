const Media = require("../model/Media");

// Create a new media post
exports.createMedia = async (req, res) => {
  const { user, image, text, reactions } = req.body;
  try {
    const media = await Media.create({ user, image, text, reactions });
    res.status(201).json({
      status: "success",
      data: media,
      message: "Media post created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to create media post",
      error: error.message,
    });
  }
};

// Get all media posts
exports.getMedia = async (req, res) => {
  try {
    const media = await Media.find({}).populate({
      path: "user",
      options: { strictPopulate: false },
    });
    res.status(200).json({
      status: "success",
      data: media,
      message: "Media posts retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to retrieve media posts",
      error: error.message,
    });
  }
};

// Get a single media post by ID
exports.getMediaById = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findById(id).populate({
      path: "user",
      options: { strictPopulate: false },
    });
    if (!media) {
      return res.status(404).json({
        status: "failed",
        message: "Media post not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: media,
      message: "Media post retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to retrieve media post",
      error: error.message,
    });
  }
};

// Update a media post by ID
exports.updateMedia = async (req, res) => {
  const { id } = req.params;
  const { userId, isexists } = req.body;
  console.log(userId, isexists);
  try {
    let updatedMedia;

    if (isexists) {
      updatedMedia = await Media.findOneAndUpdate(
        { _id: id, reactions: { $ne: userId } },
        { $addToSet: { reactions: userId } },
        { new: true }
      );
    } else {
      updatedMedia = await Media.findOneAndUpdate(
        { _id: id },
        { $pull: { reactions: userId } },
        { new: true }
      );
    }

    if (!updatedMedia) {
      return res.status(404).json({
        status: "failed",
        message: "Media post not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedMedia,
      message: "Media post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to update media post",
      error: error.message,
    });
  }
};

// Delete a media post by ID
exports.deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findByIdAndDelete(id);
    if (!media) {
      return res.status(404).json({
        status: "failed",
        message: "Media post not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: media,
      message: "Media post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to delete media post",
      error: error.message,
    });
  }
};

// update Media comment
exports.updateMediaComment = async (req, res) => {
  const { mediaId, commentId } = req.body;

  try {
    const updatedMediaComment = await Media.findOneAndUpdate(
      { _id: mediaId },
      {
        $addToSet: {
          comment: commentId,
        },
      }
    );

    if (!updatedMediaComment) {
      return res.status(404).json({
        status: "failed",
        message: "Media post not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedMediaComment,
      message: "Media post comment updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to update media comment",
      error: error.message,
    });
  }
};
