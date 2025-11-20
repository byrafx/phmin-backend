const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const protect = require("../middlewares/authMiddleware");
const {
  createFasilitas,
  getFasilitas,
  getFasilitasById,
  updateFasilitas,
  deleteFasilitas
} = require("../controllers/fasilitasController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.get("/", getFasilitas);
router.get("/:id", getFasilitasById);
router.post("/", protect, upload.single("image"), createFasilitas);
router.put("/:id", protect, upload.single("image"), updateFasilitas);
router.delete("/:id", protect, deleteFasilitas);

module.exports = router;
