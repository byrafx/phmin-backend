require("dotenv").config();
const fs = require("fs");
const path = require("path");
const connectDB = require("./src/config/db");
const app = require("./src/app");

// === Pastikan folder uploads dibuat saat server start ===
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 Folder uploads dibuat otomatis");
} else {
  console.log("📁 Folder uploads sudah ada");
}

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
