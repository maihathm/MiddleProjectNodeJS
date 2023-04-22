const express = require('express');
const sleepController = require('../controllers/sleepController');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.get('/', authentication, sleepController.getHomePage);
router.get('/history', authentication, sleepController.getHistoryPage);
router.post('/add', authentication, sleepController.addSleepRecord);
router.post('/update', authentication, sleepController.updateSleepRecord);
router.post('/delete', authentication, sleepController.deleteSleepRecord);

module.exports = router;
