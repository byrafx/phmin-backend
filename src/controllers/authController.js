const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (admin) => {
  return jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(admin);
    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.admin) return res.status(401).json({ message: 'Not authorized' });
    res.json({ id: req.admin._id, username: req.admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
