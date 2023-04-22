const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');

router.get('/', async (req, res) => {
  try {
    const sleeps = await Sleep.find({});
    res.render('index', { sleeps });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  try {
    const sleep = new Sleep(req.body);
    await sleep.save();
    res.redirect('/sleeps');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);
    res.render('show', { sleep });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);
    res.render('edit', { sleep });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const sleep = await Sleep.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/sleeps/${sleep.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Sleep.findByIdAndDelete(req.params.id);
    res.redirect('/sleeps');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
