const Video = require("../models/Video");
const Channel = require("../models/Channel");

// Add a new video
exports.addVideo = async (req, res) => {
  const { title, description, thumbnailUrl, videoUrl, channelId } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      channel: channelId,
    });

    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: newVideo._id },
    });

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("channel", "name");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
};

// Fetch a specific video
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "channel",
      "name"
    );
    if (!video) return res.status(404).json({ error: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: "Error fetching video" });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: "Error updating video" });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting video" });
  }
};
