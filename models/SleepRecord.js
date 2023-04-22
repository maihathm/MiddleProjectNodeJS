const mongoose = require('mongoose');

const sleepRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  sleepTime: { type: Number, required: true },
  wakeTime: { type: Number, required: true },
});

module.exports = mongoose.model('SleepRecord', sleepRecordSchema);