const User = require('../models/User');

// @desc    Get current user's portfolio
// @route   GET /api/portfolio/me
// @access  Private
exports.getMyPortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                portfolio: user.portfolio
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update portfolio
// @route   PUT /api/portfolio
// @access  Private
exports.updatePortfolio = async (req, res) => {
    try {
        const {
            about,
            socialLinks,
            projects,
            skills,
            experience,
            education,
            template,
            theme,
            isPublished
        } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found 🌸'
            });
        }

        // Merge nested objects instead of replacing them
        if (about) {
            user.portfolio.about = {
                ...user.portfolio.about,
                ...about
            };
        }

        if (socialLinks) {
            user.portfolio.socialLinks = {
                ...user.portfolio.socialLinks,
                ...socialLinks
            };
        }

        if (theme) {
            user.portfolio.theme = {
                ...user.portfolio.theme,
                ...theme
            };
        }

        // Replace arrays completely
        if (projects) user.portfolio.projects = projects;
        if (skills) user.portfolio.skills = skills;
        if (experience) user.portfolio.experience = experience;
        if (education) user.portfolio.education = education;

        // Update primitive values
        if (template) user.portfolio.template = template;

        if (typeof isPublished === 'boolean') {
            user.portfolio.isPublished = isPublished;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Portfolio updated successfully! 🌸',
            data: {
                portfolio: user.portfolio
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get public portfolio by username
// @route   GET /api/portfolio/:username
// @access  Public
exports.getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({
            username: username.toLowerCase(),
            'portfolio.isPublished': true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio not found 🌸'
            });
        }

        // Increment view count
        user.views += 1;

        // Store basic analytics
        user.analytics.views.push({
            timestamp: new Date(),
            referrer: req.headers.referer || 'direct'
        });

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                username: user.username,
                portfolio: user.portfolio,
                views: user.views
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};