const express = require("express");
const {
  addVideo,
  getVideos,
  getVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addVideo);
router.get("/", getVideos);
router.get("/:id", getVideo);
router.put("/:id", authMiddleware, updateVideo);
router.delete("/:id", authMiddleware, deleteVideo);

module.exports = router;
