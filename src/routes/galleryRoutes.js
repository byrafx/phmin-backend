const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const protect = require("../middlewares/authMiddleware");
const {
  createGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery
} = require("../controllers/galleryController");

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// routes
router.get("/", getGalleries);
router.get("/:id", getGalleryById);
router.post("/", protect, upload.single("image"), createGallery);
router.put("/:id", protect, upload.single("image"), updateGallery);
router.delete("/:id", protect, deleteGallery);

module.exports = router;
