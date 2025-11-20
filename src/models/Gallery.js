const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // filename dari upload
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
