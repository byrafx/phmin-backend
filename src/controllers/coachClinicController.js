const CoachClinic = require("../models/CoachClinic");
const fs = require("fs");
const path = require("path");

// CREATE
exports.createClinic = async (req, res) => {
  try {
    const { title, coach, date, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const clinic = new CoachClinic({ title, coach, date, description, image });
    await clinic.save();
   res.status(201).json({ ...clinic._doc, image_url: image ? `https://phmin-backend-production.up.railway.app/uploads/${image}` : null });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// READ all
exports.getClinics = async (req, res) => {
  try {
    const clinics = await CoachClinic.find().sort({ createdAt: -1 });
    res.json(clinics.map(c => ({ ...c._doc, image_url: c.image ? `https://phmin-backend-production.up.railway.app/uploads/${c.image}` : null })));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// READ one
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await CoachClinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Coach Clinic not found" });
    res.json({ ...clinic._doc, image_url: clinic.image ? `https://phmin-backend-production.up.railway.app/uploads/${clinic.image}` : null });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// UPDATE
exports.updateClinic = async (req, res) => {
  try {
    const { title, coach, date, description } = req.body;
    const clinic = await CoachClinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Coach Clinic not found" });

    if (req.file && clinic.image) {
      const oldPath = path.join(__dirname, "../../uploads", clinic.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      clinic.image = req.file.filename;
    }

    clinic.title = title || clinic.title;
    clinic.coach = coach || clinic.coach;
    clinic.date = date || clinic.date;
    clinic.description = description || clinic.description;

    await clinic.save();
    res.json({ ...clinic._doc, image_url: clinic.image ? `https://phmin-backend-production.up.railway.app/uploads/${clinic.image}` : null });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE
exports.deleteClinic = async (req, res) => {
  try {
    const clinic = await CoachClinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Coach Clinic not found" });
    if (clinic.image) {
      const oldPath = path.join(__dirname, "../../uploads", clinic.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    await clinic.deleteOne();
    res.json({ message: "Coach Clinic deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
