const express = require('express');
const router = express.Router();
const { getSchedules } = require('../controllers/scheduleController');

router.get('/', getSchedules);

module.exports = router;
