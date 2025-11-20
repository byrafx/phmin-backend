require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app"); // import app.js

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
