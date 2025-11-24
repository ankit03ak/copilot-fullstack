const express = require('express');
const generationRoutes = require('./generationRoutes');

const router = express.Router();

router.use('/', generationRoutes);

module.exports = router;
