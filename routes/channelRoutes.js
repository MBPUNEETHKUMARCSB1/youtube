const express = require("express");
const {
  createChannel,
  getChannels,
  getChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createChannel);
router.get("/", getChannels);
router.get("/:id", getChannel);
router.put("/:id", authMiddleware, updateChannel);
router.delete("/:id", authMiddleware, deleteChannel);

module.exports = router;
