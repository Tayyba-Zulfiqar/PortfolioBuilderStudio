const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    getMyPortfolio,
    updatePortfolio,
    getPublicPortfolio
} = require('../controllers/portfolioController');

// Protected routes
router.get('/me', protect, getMyPortfolio);
router.put('/', protect, updatePortfolio);


// Public dynamic routes
router.get('/:username', getPublicPortfolio);

module.exports = router;