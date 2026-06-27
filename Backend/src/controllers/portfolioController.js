const User = require('../models/User');

const DEFAULT_THEME = { primaryColor: '#F4A6B5', secondaryColor: '#E8B4B8' };

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

const hasUsefulObjectValue = (item, ignoredKeys = []) => {
    if (!item || typeof item !== 'object') return false;
    return Object.entries(item.toObject ? item.toObject() : item).some(([key, value]) => {
        if (key === '_id' || key === 'id' || ignoredKeys.includes(key)) return false;
        if (Array.isArray(value)) return value.some((entry) => hasText(entry) || hasUsefulObjectValue(entry));
        if (value instanceof Date) return true;
        if (typeof value === 'string') return hasText(value);
        if (typeof value === 'number' || typeof value === 'boolean') return value !== null;
        if (value && typeof value === 'object') return hasUsefulObjectValue(value);
        return false;
    });
};

const isDefaultGeneratedName = (name = '') => !hasText(name) || name === 'My Portfolio' || name === 'My First Portfolio' || /^Portfolio #\d+$/.test(name);

const hasPortfolioUserContent = (portfolio) => {
    if (!portfolio) return false;
    const p = portfolio.toObject ? portfolio.toObject() : portfolio;
    const hasAbout = ['fullName', 'headline', 'bio', 'location', 'profilePicture'].some((key) => hasText(p.about?.[key]));
    const hasSocial = ['github', 'linkedin'].some((key) => hasText(p.socialLinks?.[key]));
    const hasCollections = ['projects', 'skills', 'experience', 'education'].some((key) =>
        Array.isArray(p[key]) && p[key].some((item) => hasUsefulObjectValue(item, ['proficiency']))
    );
    const hasCustomSettings =
        (hasText(p.name) && !isDefaultGeneratedName(p.name)) ||
        (p.template && p.template !== 'modern') ||
        (p.theme?.primaryColor && p.theme.primaryColor !== DEFAULT_THEME.primaryColor) ||
        (p.theme?.secondaryColor && p.theme.secondaryColor !== DEFAULT_THEME.secondaryColor) ||
        p.isPublished === true;

    return hasAbout || hasSocial || hasCollections || hasCustomSettings;
};

const removeEmptyPortfolios = (user) => {
    if (!user.portfolios || user.portfolios.length === 0) return false;

    const keepIds = user.portfolios
        .filter((portfolio) => hasPortfolioUserContent(portfolio))
        .map((portfolio) => String(portfolio._id));

    if (keepIds.length === user.portfolios.length) return false;

    user.portfolios = user.portfolios.filter((portfolio) => keepIds.includes(String(portfolio._id)));
    if (!user.activePortfolioId || !keepIds.includes(String(user.activePortfolioId))) {
        user.activePortfolioId = user.portfolios[0]?._id || null;
        user.portfolio = user.portfolios[0] || null;
    }

    return true;
};

// Helper to ensure a user has at least one portfolio migrated/initialized
const ensurePortfoliosExist = (user) => {
    let modified = false;

    // Check if legacy single portfolio needs migration
    if (!user.portfolios || user.portfolios.length === 0) {
        if (user.portfolio && hasPortfolioUserContent(user.portfolio)) {
            // Migrate legacy portfolio
            const migratedPortfolio = {
                name: 'My Portfolio',
                about: user.portfolio.about || { fullName: '', headline: '', bio: '', location: '', profilePicture: '' },
                socialLinks: user.portfolio.socialLinks || { github: '', linkedin: '' },
                projects: user.portfolio.projects || [],
                skills: user.portfolio.skills || [],
                experience: user.portfolio.experience || [],
                education: user.portfolio.education || [],
                template: user.portfolio.template || 'modern',
                isPublished: user.portfolio.isPublished || false,
                theme: user.portfolio.theme || { primaryColor: '#F4A6B5', secondaryColor: '#E8B4B8' },
            };
            user.portfolios.push(migratedPortfolio);
            user.activePortfolioId = user.portfolios[0]?._id || null;
            modified = true;
        }
    }

    // If activePortfolioId is unset but we have portfolios, set it to the first one
    if (!user.activePortfolioId && user.portfolios.length > 0) {
        user.activePortfolioId = user.portfolios[0]?._id || null;
        modified = true;
    }

    return modified;
};

// ============================================
// @desc    Get current user's active/specific portfolio
// @route   GET /api/portfolio/me
// @access  Private
// ============================================
exports.getMyPortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        const modified = ensurePortfoliosExist(user);
        if (modified) {
            await user.save();
        }

        // Return specific portfolio by ID query parameter, or default to active
        const portfolioId = req.query.id || user.activePortfolioId;
        const portfolio = portfolioId ? user.portfolios.id(portfolioId) : user.portfolios[0];

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                portfolio,
                views: user.views,
            },
        });
    } catch (error) {
        console.error('Get portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Get all portfolios of current user
// @route   GET /api/portfolio/all
// @access  Private
// ============================================
exports.getAllPortfolios = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        const modified = ensurePortfoliosExist(user) || removeEmptyPortfolios(user);
        if (modified) {
            await user.save();
        }

        res.status(200).json({
            success: true,
            data: {
                portfolios: user.portfolios.filter((portfolio) => hasPortfolioUserContent(portfolio)),
                activePortfolioId: user.activePortfolioId,
            },
        });
    } catch (error) {
        console.error('Get all portfolios error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Create a new empty portfolio
// @route   POST /api/portfolio/new
// @access  Private
// ============================================
exports.createPortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        const newPortfolioCount = user.portfolios.length + 1;
        const newPortfolio = {
            name: `Portfolio #${newPortfolioCount}`,
            about: { fullName: '', headline: '', bio: '', location: '', profilePicture: '' },
            socialLinks: { github: '', linkedin: '' },
            projects: [],
            skills: [],
            experience: [],
            education: [],
            template: 'modern',
            isPublished: false,
            theme: DEFAULT_THEME,
        };

        user.portfolios.push(newPortfolio);
        const savedPortfolio = user.portfolios[user.portfolios.length - 1];
        
        await user.save();

        res.status(201).json({
            success: true,
            message: 'New portfolio created! 🌸',
            data: {
                portfolio: savedPortfolio,
            },
        });
    } catch (error) {
        console.error('Create portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Update specific or active portfolio
// @route   PUT /api/portfolio/:id?
// @access  Private
// ============================================
exports.updatePortfolio = async (req, res) => {
    try {
        const portfolioData = req.body.portfolio || req.body;
        const portfolioId = req.params.id || req.query.id;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        ensurePortfoliosExist(user);
        
        const targetId = portfolioId || user.activePortfolioId;
        const portfolio = user.portfolios.id(targetId);
        
        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸',
            });
        }

        // Merge updates
        if (portfolioData) {
            if (portfolioData.name !== undefined) {
                portfolio.name = portfolioData.name;
            }
            if (portfolioData.about) {
                portfolio.about = { ...portfolio.about, ...portfolioData.about };
            }
            if (portfolioData.socialLinks) {
                portfolio.socialLinks = { ...portfolio.socialLinks, ...portfolioData.socialLinks };
            }
            if (portfolioData.projects) {
                portfolio.projects = portfolioData.projects;
            }
            if (portfolioData.skills) {
                portfolio.skills = portfolioData.skills;
            }
            if (portfolioData.experience) {
                portfolio.experience = portfolioData.experience;
            }
            if (portfolioData.education) {
                portfolio.education = portfolioData.education;
            }
            if (portfolioData.template) {
                portfolio.template = portfolioData.template;
            }
            if (portfolioData.isPublished !== undefined) {
                portfolio.isPublished = portfolioData.isPublished;
            }
            if (portfolioData.theme) {
                portfolio.theme = { ...portfolio.theme, ...portfolioData.theme };
            }
        }

        // Sync to legacy if this is active
        if (String(portfolio._id) === String(user.activePortfolioId)) {
            user.portfolio = portfolio;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Portfolio updated successfully! 🌸',
            data: {
                portfolio,
                views: user.views,
            },
        });
    } catch (error) {
        console.error('Update portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Delete specific portfolio by ID
// @route   DELETE /api/portfolio/:id
// @access  Private
// ============================================
exports.deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        const portfolio = user.portfolios.id(id);
        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸',
            });
        }
        user.portfolios.pull(id);

        // Reset active if we deleted the active one
        if (String(user.activePortfolioId) === String(id)) {
            user.activePortfolioId = user.portfolios[0]?._id || null;
            user.portfolio = user.portfolios[0] || null; // sync legacy
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Portfolio deleted successfully! 🌸',
            data: {
                activePortfolioId: user.activePortfolioId,
            },
        });
    } catch (error) {
        console.error('Delete portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Set specific portfolio as active public portfolio
// @route   POST /api/portfolio/:id/active
// @access  Private
// ============================================
exports.setActivePortfolio = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        const portfolio = user.portfolios.id(id);
        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸',
            });
        }

        user.activePortfolioId = portfolio._id;
        user.portfolio = portfolio; // Sync legacy

        await user.save();

        res.status(200).json({
            success: true,
            message: `"${portfolio.name}" is now your active portfolio! 🚀`,
            data: {
                activePortfolioId: user.activePortfolioId,
            },
        });
    } catch (error) {
        console.error('Set active portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Get public portfolio by username (returns active portfolio)
// @route   GET /api/portfolio/:username
// @access  Public
// ============================================
exports.getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({
            username: username.toLowerCase(),
        }).select('username portfolios activePortfolioId views analytics');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        const modified = ensurePortfoliosExist(user);
        if (modified) {
            await user.save();
        }

        const portfolio = user.portfolios.id(user.activePortfolioId) || user.portfolios[0];

        if (!portfolio || !portfolio.isPublished) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found or is currently private 🌸',
            });
        }

        // Initialize analytics if it doesn't exist
        if (!user.analytics) {
            user.analytics = { views: [], clicks: [] };
        }
        if (!user.analytics.views) {
            user.analytics.views = [];
        }

        // Increment view count
        user.views += 1;
        user.analytics.views.push({
            timestamp: new Date(),
            ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            referrer: req.headers.referer || 'direct',
        });
        await user.save();

        res.status(200).json({
            success: true,
            data: {
                username: user.username,
                portfolio: portfolio,
                views: user.views,
            },
        });
    } catch (error) {
        console.error('Get public portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Get single portfolio details by ID for Preview
// @route   GET /api/portfolio/preview/:id
// @access  Public
// ============================================
exports.getPortfolioForPreview = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ 'portfolios._id': id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸',
            });
        }

        const portfolio = user.portfolios.id(id);

        res.status(200).json({
            success: true,
            data: {
                portfolio,
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Get portfolio for preview error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Toggle publish status of specific portfolio
// @route   PATCH /api/portfolio/publish
// @access  Private
// ============================================
exports.togglePublish = async (req, res) => {
    try {
        const { isPublished, id } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        ensurePortfoliosExist(user);
        const targetId = id || user.activePortfolioId;
        const portfolio = user.portfolios.id(targetId);

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸',
            });
        }

        portfolio.isPublished = isPublished;

        if (String(portfolio._id) === String(user.activePortfolioId)) {
            user.portfolio = portfolio; // Sync legacy
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: isPublished
                ? 'Portfolio published! 🚀 Share your link with the world!'
                : 'Portfolio unpublished. It is now private.',
            data: {
                isPublished: portfolio.isPublished,
            },
        });
    } catch (error) {
        console.error('Toggle publish error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// ============================================
// @desc    Get all published portfolios for Explore
// @route   GET /api/portfolio/explore
// @access  Public
// ============================================
exports.getExplorePortfolios = async (req, res) => {
    try {
        const currentUser = req.userId ? await User.findById(req.userId).select('savedPortfolios') : null;
        const savedIds = new Set((currentUser?.savedPortfolios || []).map((id) => String(id)));

        const portfolios = await User.aggregate([
            { $unwind: '$portfolios' },
            {
                $match: {
                    'portfolios.isPublished': true,
                    ...(currentUser ? { _id: { $ne: currentUser._id } } : {}),
                },
            },
            { $sort: { 'portfolios.updatedAt': -1, updatedAt: -1 } },
            {
                $project: {
                    _id: '$portfolios._id',
                    username: 1,
                    views: 1,
                    portfolio: '$portfolios',
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: {
                portfolios: portfolios.map((item) => ({
                    ...item,
                    isSaved: savedIds.has(String(item._id)),
                })),
            },
        });
    } catch (error) {
        console.error('Get explore portfolios error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

exports.getSavedPortfolios = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('savedPortfolios');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const savedIds = (user.savedPortfolios || []).map((id) => String(id));
        const portfolios = await User.aggregate([
            { $unwind: '$portfolios' },
            {
                $match: {
                    'portfolios._id': { $in: user.savedPortfolios || [] },
                    'portfolios.isPublished': true,
                    _id: { $ne: user._id },
                },
            },
            {
                $project: {
                    _id: '$portfolios._id',
                    username: 1,
                    views: 1,
                    portfolio: '$portfolios',
                },
            },
        ]);

        portfolios.sort((a, b) => savedIds.indexOf(String(a._id)) - savedIds.indexOf(String(b._id)));

        res.status(200).json({
            success: true,
            data: { portfolios },
        });
    } catch (error) {
        console.error('Get saved portfolios error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.savePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const owner = await User.findOne({ 'portfolios._id': id, _id: { $ne: user._id } });
        const portfolio = owner?.portfolios.id(id);
        if (!portfolio || !portfolio.isPublished) {
            return res.status(404).json({ success: false, message: 'Portfolio not found or unavailable' });
        }

        const alreadySaved = (user.savedPortfolios || []).some((savedId) => String(savedId) === String(id));
        if (!alreadySaved) {
            user.savedPortfolios.push(portfolio._id);
            await user.save();
        }

        res.status(200).json({ success: true, data: { savedPortfolioId: portfolio._id } });
    } catch (error) {
        console.error('Save portfolio error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.unsavePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.savedPortfolios = (user.savedPortfolios || []).filter((savedId) => String(savedId) !== String(id));
        await user.save();

        res.status(200).json({ success: true, data: { savedPortfolioId: id } });
    } catch (error) {
        console.error('Unsave portfolio error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

