const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'manager', 'admin', 'hall-owner'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 