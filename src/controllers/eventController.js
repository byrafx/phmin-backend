const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const image = req.file ? req.file.filename : null;

    const newEvent = await Event.create({ title, description, date, image });
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menyimpan data event" });
  }
};

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data event" });
  }
};

// GET EVENT BY ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event tidak ditemukan" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data event" });
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const updateData = { title, description, date };

    if (req.file) updateData.image = req.file.filename;

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event tidak ditemukan" });

    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate event" });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event tidak ditemukan" });

    // Hapus file image jika ada
    if (deleted.image) {
      const filePath = path.join(__dirname, "../../uploads", deleted.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Event berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus event" });
  }
};
