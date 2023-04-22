const SleepRecord = require('../models/SleepRecord');

exports.getHomePage = async (req, res) => {
  if(!req.user){
    return res.redirect("/login")
  }
  const sleepRecords = await SleepRecord.find({ user: req.user._id }).limit(10);
  res.render('home', {user:req.user, sleepRecords });
};

exports.getHistoryPage = async (req, res) => {
  if(!req.user){
    return res.redirect("/login")
  }
  const sleepRecords = await SleepRecord.find({ user: req.user._id });
  res.render('history', { sleepRecords });
};

exports.addSleepRecord = async (req, res) => {
  if(!req.user){
    return res.redirect("/login")
  }
  const { date, sleepTime, wakeTime } = req.body;
  const sleepRecord = new SleepRecord({ user: req.user._id, date, sleepTime, wakeTime });
  await sleepRecord.save();
  res.redirect('/');
};

exports.updateSleepRecord = async (req, res) => {
  if(!req.user){
    return res.redirect("/login")
  }
  const { id, date, sleepTime, wakeTime } = req.body;
  await SleepRecord.findByIdAndUpdate(id, { date, sleepTime, wakeTime });
  res.redirect('/');
};

exports.deleteSleepRecord = async (req, res) => {
  if(!req.user){
    return res.redirect("/login")
  }
  const { id } = req.body;
  await SleepRecord.findByIdAndDelete(id);
  res.redirect('/');
};
