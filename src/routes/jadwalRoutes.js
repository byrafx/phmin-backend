const express = require("express");
const router = express.Router();
const {
  getJadwalByDate,
  createJadwal,
  updateJadwal,
  deleteJadwal
} = require("../controllers/jadwalController");

router.get("/", getJadwalByDate); // ?date=YYYY-MM-DD
router.post("/", createJadwal);
router.put("/:id", updateJadwal);
router.delete("/:id", deleteJadwal);

module.exports = router;
