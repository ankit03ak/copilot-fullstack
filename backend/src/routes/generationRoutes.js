const express = require('express');
const {
  generateCode,
  getHistory,
  deleteGeneration,
  deleteAllGenerations,
  updateFavorite
} = require('../controllers/generationController');

const router = express.Router();

router.post('/generate', generateCode);

router.get('/history', getHistory);


router.delete('/history/:id', deleteGeneration);

router.delete('/history', deleteAllGenerations);
router.patch('/history/:id/favorite', updateFavorite);

module.exports = router;
