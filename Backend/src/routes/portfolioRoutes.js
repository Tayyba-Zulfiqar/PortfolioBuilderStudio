const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    getMyPortfolio,
    updatePortfolio,
    getPublicPortfolio,
    togglePublish,
    getAllPortfolios,
    createPortfolio,
    deletePortfolio,
    setActivePortfolio,
    getPortfolioForPreview,
} = require('../controllers/portfolioController');

// PROTECTED ROUTES (require authentication)
router.get('/all', protect, getAllPortfolios);
router.post('/new', protect, createPortfolio);
router.get('/me', protect, getMyPortfolio);
router.put('/', protect, updatePortfolio);
router.put('/:id', protect, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);
router.post('/:id/active', protect, setActivePortfolio);
router.patch('/publish', protect, togglePublish);

// PUBLIC ROUTES
router.get('/preview/:id', getPortfolioForPreview);
router.get('/:username', getPublicPortfolio);

module.exports = router;