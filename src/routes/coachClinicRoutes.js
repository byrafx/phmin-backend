const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const protect = require("../middlewares/authMiddleware");
const {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  deleteClinic
} = require("../controllers/coachClinicController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.get("/", getClinics);
router.get("/:id", getClinicById);
router.post("/", protect, upload.single("image"), createClinic);
router.put("/:id", protect, upload.single("image"), updateClinic);
router.delete("/:id", protect, deleteClinic);

module.exports = router;
