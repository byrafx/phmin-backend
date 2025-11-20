const Fasilitas = require("../models/Fasilitas");
const fs = require("fs");
const path = require("path");

// CREATE
exports.createFasilitas = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const fasilitas = new Fasilitas({ name, description, image });
    await fasilitas.save();
    res.status(201).json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ all
exports.getFasilitas = async (req, res) => {
  try {
    const items = await Fasilitas.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ one
exports.getFasilitasById = async (req, res) => {
  try {
    const item = await Fasilitas.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Fasilitas not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateFasilitas = async (req, res) => {
  try {
    const { name, description } = req.body;
    const item = await Fasilitas.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Fasilitas not found" });

    if (req.file && item.image) {
      const oldPath = path.join(__dirname, "../../uploads", item.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      item.image = req.file.filename;
    }

    item.name = name || item.name;
    item.description = description || item.description;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteFasilitas = async (req, res) => {
  try {
    const item = await Fasilitas.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Fasilitas not found" });

    if (item.image) {
      const oldPath = path.join(__dirname, "../../uploads", item.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await item.deleteOne();
    res.json({ message: "Fasilitas deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
