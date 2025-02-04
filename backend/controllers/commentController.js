const Comment = require("../models/Comment");
const Video = require("../models/Video");

// Add a comment to a video
exports.addComment = async (req, res) => {
  const { text, videoId } = req.body;
  const userId = req.user.id;

  try {
    const newComment = await Comment.create({
      text: text,
      user: userId,
      video: videoId,
    });

    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch comments for a video
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate(
      "user",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
