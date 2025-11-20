const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const protect = require("../middlewares/authMiddleware");

const {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  deleteClinic
} = require("../controllers/coachClinicController");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clinics",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({ storage });

router.get("/", getClinics);
router.get("/:id", getClinicById);
router.post("/", protect, upload.single("image"), createClinic);
router.put("/:id", protect, upload.single("image"), updateClinic);
router.delete("/:id", protect, deleteClinic);

module.exports = router;
