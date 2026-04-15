const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createFolder, getFolders } = require("../controllers/folderController");

router.post("/", auth, createFolder);
router.get("/", auth, getFolders);

module.exports = router;