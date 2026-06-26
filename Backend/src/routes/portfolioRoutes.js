const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    getMyPortfolio,
    updatePortfolio,
    getPublicPortfolio,
    togglePublish,
} = require('../controllers/portfolioController');


// PROTECTED ROUTES (require authentication)
router.get('/me', protect, getMyPortfolio);
router.put('/', protect, updatePortfolio);
router.patch('/publish', protect, togglePublish);

// PUBLIC ROUTES
router.get('/:username', getPublicPortfolio);

module.exports = router;