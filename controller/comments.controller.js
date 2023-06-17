const Comment = require("../model/Comments");


// Get all comments
exports.getComments =
  ("/",
  async (req, res) => {
    try {
      const comments = await Comment.find().populate('userId').populate('postId').exec();
      res.json({
        data :comments,
        status: 'success'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Create a new comment
exports.createComment =
  ("/",
  async (req, res) => {
    try {
      const { postId, userId, text } = req.body;
      const comment = new Comment({ postId, userId, text });
      console.log('comment', comment);
      const newComment = await comment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Get a single comment by ID
exports.getCommentById = (req, res) => {
  res.json(res.comment);
};

// Update a comment
exports.updateComment =
  ("/:id",
  getComment,
  async (req, res) => {
    try {
      const { text } = req.body;
      res.comment.text = text;
      const updatedComment = await res.comment.save();
      res.json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Delete a comment
exports.deleteCommentById =
  ("/:id",
  getComment,
  async (req, res) => {
    try {
      await res.comment.remove();
      res.json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Middleware to get a single comment by ID
async function getComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id).populate('userId').populate('postId').exec();;
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.comment = comment;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

