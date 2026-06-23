const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    portfolio: {
        about: {
            fullName: { type: String, default: '' },
            headline: { type: String, default: '' },
            bio: { type: String, default: '' },
            location: { type: String, default: '' },
            profilePicture: { type: String, default: '' }
        },
        socialLinks: {
            github: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            twitter: { type: String, default: '' },
            youtube: { type: String, default: '' }
        },
        projects: [{
            title: String,
            description: String,
            techStack: [String],
            liveUrl: String,
            githubUrl: String,
            images: [String]
        }],
        skills: [{
            name: String,
            proficiency: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Expert']
            }
        }],
        experience: [{
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
            logo: String
        }],
        education: [{
            degree: String,
            institution: String,
            year: Number,
            gpa: Number
        }],
        template: {
            type: String,
            default: 'modern'
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        theme: {
            primaryColor: { type: String, default: '#F4A6B5' },
            secondaryColor: { type: String, default: '#E8B4B8' }
        }
    },
    views: {
        type: Number,
        default: 0
    },
    analytics: {
        views: [{
            timestamp: Date,
            ip: String,
            userAgent: String,
            referrer: String
        }],
        clicks: [{
            link: String,
            timestamp: Date
        }]
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
