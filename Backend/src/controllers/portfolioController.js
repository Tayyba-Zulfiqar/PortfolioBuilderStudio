const User = require('../models/User');

// ============================================
// @desc    Get current user's portfolio
// @route   GET /api/portfolio/me
// @access  Private
// ============================================
exports.getMyPortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('portfolio views');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                portfolio: user.portfolio,
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
// @desc    Update entire portfolio
// @route   PUT /api/portfolio
// @access  Private
// ============================================
// ============================================
// @desc    Update entire portfolio
// @route   PUT /api/portfolio
// @access  Private
// ============================================
exports.updatePortfolio = async (req, res) => {
    try {
        const portfolioData = req.body.portfolio || req.body;

        // ✅ Find user
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        // ✅ MERGE - Update only fields that are sent
        // This preserves existing data while updating new fields
        if (portfolioData) {
            // Merge about
            if (portfolioData.about) {
                user.portfolio.about = { ...user.portfolio.about, ...portfolioData.about };
            }

            // Merge socialLinks
            if (portfolioData.socialLinks) {
                user.portfolio.socialLinks = { ...user.portfolio.socialLinks, ...portfolioData.socialLinks };
            }

            // Merge projects
            if (portfolioData.projects) {
                user.portfolio.projects = portfolioData.projects;
            }

            // Merge skills
            if (portfolioData.skills) {
                user.portfolio.skills = portfolioData.skills;
            }

            // Merge experience
            if (portfolioData.experience) {
                user.portfolio.experience = portfolioData.experience;
            }

            // Merge education
            if (portfolioData.education) {
                user.portfolio.education = portfolioData.education;
            }

            // Merge template
            if (portfolioData.template) {
                user.portfolio.template = portfolioData.template;
            }

            // Merge isPublished
            if (portfolioData.isPublished !== undefined) {
                user.portfolio.isPublished = portfolioData.isPublished;
            }

            // Merge theme
            if (portfolioData.theme) {
                user.portfolio.theme = { ...user.portfolio.theme, ...portfolioData.theme };
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Portfolio updated successfully! 🌸',
            data: {
                portfolio: user.portfolio,
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
// @desc    Get public portfolio by username
// @route   GET /api/portfolio/:username
// @access  Public
// ============================================
exports.getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({
            username: username.toLowerCase(),
            'portfolio.isPublished': true,
        }).select('username portfolio views analytics');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸',
            });
        }

        // ✅ FIX: Initialize analytics if it doesn't exist
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
                portfolio: user.portfolio,
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
// @desc    Toggle portfolio publish status
// @route   PATCH /api/portfolio/publish
// @access  Private
// ============================================
exports.togglePublish = async (req, res) => {
    try {
        const { isPublished } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { 'portfolio.isPublished': isPublished },
            { new: true }
        ).select('portfolio');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸',
            });
        }

        res.status(200).json({
            success: true,
            message: isPublished
                ? 'Portfolio published! 🚀 Share your link with the world!'
                : 'Portfolio unpublished. It is now private.',
            data: {
                isPublished: user.portfolio.isPublished,
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