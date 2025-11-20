const mongoose = require("mongoose");

const jadwalSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: Number, required: true }, // jam mulai, misal 6 = 06:00
  duration: { type: Number, default: 1 }, // durasi dalam jam
  team: { type: String, default: "" }, // nama tim yg booking
  lapangan: { type: String, enum: ["A", "B"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("JadwalLapangan", jadwalSchema);
