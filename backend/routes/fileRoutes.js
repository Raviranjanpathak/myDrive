const express = require("express");
const multer = require("multer");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { uploadFile } = require("../controllers/fileController");
const File = require("../models/File");

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("image"), uploadFile);
router.get("/", auth, async (req, res) => {
  const files = await File.find({ user: req.user.id });
  res.json(files);
});

module.exports = router;