require('dotenv').config();
const connectDB = require('./src/config/db');
const Admin = require('./src/models/Admin');

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const exists = await Admin.findOne({ username: 'phmin' });
    if (exists) {
      console.log('Admin already exists:', exists.username);
      process.exit(0);
    }
    const admin = new Admin({ username: 'phmin', password: 'phmin@house*?' });
    await admin.save();
    console.log('Default admin created. username: phmin password: phmin@house*?');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
