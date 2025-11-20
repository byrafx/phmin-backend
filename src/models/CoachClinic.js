const mongoose = require("mongoose");

const coachClinicSchema = new mongoose.Schema({
  title: String,
  coach: String,
  date: String,
  description: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("CoachClinic", coachClinicSchema);
