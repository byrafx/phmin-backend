require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const connectDB = require("./src/config/db"); // sesuaikan path DB lo
const multer = require("multer");

const app = express();
app.use(express.json());

// === Folder uploads & static middleware ===
const UPLOAD_PATH = "uploads";
app.use("/uploads", express.static(path.join(__dirname, UPLOAD_PATH)));

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, UPLOAD_PATH);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 Folder uploads dibuat otomatis");
} else {
  console.log("📁 Folder uploads sudah ada");
}

// === Multer setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("File type not allowed"), false);
};

const upload = multer({ storage, fileFilter });

// === Upload routes ===

// Single file
app.post("/api/upload", upload.single("file"), (req, res) => {
  const fileUrl = `https://phmin-backend-production.up.railway.app/uploads/${req.file.filename}`;
  res.json({ image: fileUrl });
});

// Multiple files
app.post("/api/uploads", upload.array("files", 10), (req, res) => {
  const files = req.files.map(file => ({
    filename: file.filename,
    url: `https://phmin-backend-production.up.railway.app/uploads/${file.filename}`
  }));
  res.json({ files });
});

// === Connect to MongoDB ===
connectDB();

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
