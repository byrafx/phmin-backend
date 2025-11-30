const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const protect = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Setup multer storage sama kayak events
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// PUBLIC routes (FE landing page)
router.get("/", getProducts);
router.get("/:id", getProductById);

// PROTECTED routes (admin dashboard)
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
