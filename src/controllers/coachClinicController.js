const CoachClinic = require("../models/CoachClinic");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// CREATE
exports.createClinic = async (req, res) => {
  try {
    const { title, coach, date, description } = req.body;

    let image_url = null;
    if (req.file) {
      image_url = await uploadToCloudinary(req.file.buffer, "phmin/clinics");
    }

    const clinic = await CoachClinic.create({
      title,
      coach,
      date,
      description,
      image: image_url
    });

    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ all
exports.getClinics = async (req, res) => {
  try {
    const clinics = await CoachClinic.find().sort({ createdAt: -1 });
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ one
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await CoachClinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateClinic = async (req, res) => {
  try {
    const { title, coach, date, description } = req.body;

    const clinic = await CoachClinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    // upload image baru
    if (req.file) {
      clinic.image = await uploadToCloudinary(req.file.buffer, "phmin/clinics");
    }

    clinic.title = title || clinic.title;
    clinic.coach = coach || clinic.coach;
    clinic.date = date || clinic.date;
    clinic.description = description || clinic.description;

    await clinic.save();
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteClinic = async (req, res) => {
  try {
    const clinic = await CoachClinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    await clinic.deleteOne();
    res.json({ message: "Clinic deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
