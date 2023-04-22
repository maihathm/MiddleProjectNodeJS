const mongoose = require('mongoose');
const { Schema } = mongoose;

const sleepSchema = new Schema({
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  wakeTime: { type: String, required: true },
  sleepTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sleep', sleepSchema);
