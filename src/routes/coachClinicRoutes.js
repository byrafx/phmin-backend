const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middlewares/authMiddleware");
const {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  deleteClinic
} = require("../controllers/coachClinicController");

// ----- MULTER MEMORY STORAGE (untuk Cloudinary) -----
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// ----- ROUTES -----
router.get("/", getClinics);
router.get("/:id", getClinicById);
router.post("/", protect, upload.single("image"), createClinic);
router.put("/:id", protect, upload.single("image"), updateClinic);
router.delete("/:id", protect, deleteClinic);

module.exports = router;
