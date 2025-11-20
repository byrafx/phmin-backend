const JadwalLapangan = require("../models/JadwalLapangan");

// Get jadwal per tanggal
exports.getJadwalByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const jadwal = await JadwalLapangan.find({ date });
    res.json(jadwal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tambah jadwal
exports.createJadwal = async (req, res) => {
  try {
    const { date, startTime, duration, lapangan, team } = req.body;
    const newJadwal = new JadwalLapangan({ date, startTime, duration, lapangan, team });
    await newJadwal.save();
    res.status(201).json(newJadwal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update jadwal
exports.updateJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalLapangan.findById(req.params.id);
    if (!jadwal) return res.status(404).json({ message: "Jadwal tidak ditemukan" });

    const { date, startTime, duration, lapangan, team } = req.body;
    jadwal.date = date ?? jadwal.date;
    jadwal.startTime = startTime ?? jadwal.startTime;
    jadwal.duration = duration ?? jadwal.duration;
    jadwal.lapangan = lapangan ?? jadwal.lapangan;
    jadwal.team = team ?? jadwal.team;

    await jadwal.save();
    res.json(jadwal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete jadwal
exports.deleteJadwal = async (req, res) => {
  try {
    await JadwalLapangan.findByIdAndDelete(req.params.id);
    res.json({ message: "Jadwal berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
