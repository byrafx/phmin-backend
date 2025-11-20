const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// CREATE Gallery
exports.createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const gallery = new Gallery({ title, description, image });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ all Galleries
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ single Gallery
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE Gallery
exports.updateGallery = async (req, res) => {
  try {
    const { title, description } = req.body;
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    if (req.file && gallery.image) {
      const oldPath = path.join(__dirname, "../../uploads", gallery.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      gallery.image = req.file.filename;
    }

    gallery.title = title || gallery.title;
    gallery.description = description || gallery.description;

    await gallery.save();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE Gallery
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    if (gallery.image) {
      const oldPath = path.join(__dirname, "../../uploads", gallery.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await gallery.deleteOne();
    res.json({ message: "Gallery deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
