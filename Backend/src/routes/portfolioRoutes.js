const express = require('express');
const router = express.Router();
const { protect, optionalProtect } = require('../middlewares/auth');
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
    getExplorePortfolios,
    getSavedPortfolios,
    savePortfolio,
    unsavePortfolio,
} = require('../controllers/portfolioController');

// PROTECTED ROUTES (require authentication)
router.get('/all', protect, getAllPortfolios);
router.get('/saved', protect, getSavedPortfolios);
router.post('/saved/:id', protect, savePortfolio);
router.delete('/saved/:id', protect, unsavePortfolio);
router.post('/new', protect, createPortfolio);
router.get('/me', protect, getMyPortfolio);
router.put('/', protect, updatePortfolio);
router.put('/:id', protect, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);
router.post('/:id/active', protect, setActivePortfolio);
router.patch('/publish', protect, togglePublish);

// PUBLIC ROUTES
router.get('/explore', optionalProtect, getExplorePortfolios);
router.get('/preview/:id', getPortfolioForPreview);
router.get('/:username', getPublicPortfolio);

module.exports = router;
