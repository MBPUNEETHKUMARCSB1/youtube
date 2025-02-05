const Channel = require("../models/Channel");
const User = require("../models/User");

// Create a new channel
exports.createChannel = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const newChannel = await Channel.create({
      name,
      description,
      owner: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { channels: newChannel._id },
    });

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ error: "Error creating channel" });
  }
};

// Fetch all channels
exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate("owner", "username");
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ error: "Error fetching channels" });
  }
};

// Fetch a specific channel
exports.getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate("videos");
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: "Error fetching channel" });
  }
};

// Update a channel
exports.updateChannel = async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json({ error: "Error updating channel" });
  }
};

// Delete a channel
exports.deleteChannel = async (req, res) => {
  try {
    await Channel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Channel deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting channel" });
  }
};
