const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const fasilitasRoutes = require('./routes/fasilitasRoutes');
const eventRoutes = require('./routes/eventRoutes');
const coachClinicRoutes = require('./routes/coachClinicRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');

const app = express();

// CORS FIXED
app.use(cors({
  origin: [
    "https://pickleballhouse.id",
    "https://www.pickleballhouse.id",
    /\.pickleballhouse\.id$/
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads (not persistent on Railway!)
const uploadPath = process.env.UPLOAD_PATH || 'uploads';
app.use('/' + uploadPath, express.static(path.join(__dirname, '..', uploadPath)));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/fasilitas', fasilitasRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clinics', coachClinicRoutes);
app.use('/api/jadwal', jadwalRoutes);

// Health check
app.get('/api/test', (req, res) => res.send('Server OK'));

// Home
app.get('/', (req, res) => res.json({ ok: true, message: 'PHMIN Backend is running' }));

module.exports = app;
