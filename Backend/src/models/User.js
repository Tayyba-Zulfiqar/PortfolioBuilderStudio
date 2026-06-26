const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [20, 'Username cannot exceed 20 characters'],
            match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        portfolio: {
            about: {
                fullName: {
                    type: String,
                    default: '',
                    trim: true,
                    minlength: [2, 'Name must be at least 2 characters'],
                    maxlength: [60, 'Name is too long'],
                },
                headline: {
                    type: String,
                    default: '',
                    trim: true,
                    maxlength: [100, 'Headline is too long'],
                },
                bio: {
                    type: String,
                    default: '',
                    maxlength: [500, 'Bio is too long'],
                },
                location: {
                    type: String,
                    default: '',
                    trim: true,
                    maxlength: [100, 'Location is too long'],
                },
                profilePicture: {
                    type: String,
                    default: '',
                    trim: true,
                    match: [/^(https?:\/\/[^\s]+)$/, 'Invalid image URL'],
                },
            },
            socialLinks: {
                github: { type: String, default: '', trim: true },
                linkedin: { type: String, default: '', trim: true },
                twitter: { type: String, default: '', trim: true },
                youtube: { type: String, default: '', trim: true },
            },
            projects: [
                {
                    title: {
                        type: String,
                        required: [true, 'Project title is required'],
                        trim: true,
                        minlength: [3, 'Title must be at least 3 characters'],
                        maxlength: [100, 'Title is too long'],
                    },
                    description: {
                        type: String,
                        default: '',
                        maxlength: [500, 'Description is too long'],
                    },
                    techStack: [
                        {
                            type: String,
                            trim: true,
                        },
                    ],
                    liveUrl: {
                        type: String,
                        default: '',
                        trim: true,
                    },
                    githubUrl: {
                        type: String,
                        default: '',
                        trim: true,
                    },
                    images: [
                        {
                            type: String,
                            trim: true,
                        },
                    ],
                },
            ],
            skills: [
                {
                    name: {
                        type: String,
                        required: [true, 'Skill name is required'],
                        trim: true,
                        minlength: [2, 'Skill name must be at least 2 characters'],
                        maxlength: [50, 'Skill name is too long'],
                    },
                    proficiency: {
                        type: String,
                        enum: {
                            values: ['Beginner', 'Intermediate', 'Expert'],
                            message: 'Please select a valid proficiency level',
                        },
                        default: 'Beginner',
                    },
                },
            ],
            experience: [
                {
                    title: {
                        type: String,
                        required: [true, 'Job title is required'],
                        trim: true,
                        minlength: [3, 'Job title must be at least 3 characters'],
                        maxlength: [100, 'Job title is too long'],
                    },
                    company: {
                        type: String,
                        required: [true, 'Company name is required'],
                        trim: true,
                        minlength: [2, 'Company name must be at least 2 characters'],
                        maxlength: [100, 'Company name is too long'],
                    },
                    startDate: {
                        type: Date,
                        required: [true, 'Start date is required'],
                    },
                    endDate: {
                        type: Date,
                        default: null,
                    },
                    description: {
                        type: String,
                        default: '',
                        maxlength: [500, 'Description is too long'],
                    },
                    logo: {
                        type: String,
                        default: '',
                        trim: true,
                    },
                },
            ],
            education: [
                {
                    degree: {
                        type: String,
                        required: [true, 'Degree is required'],
                        trim: true,
                        minlength: [3, 'Degree must be at least 3 characters'],
                        maxlength: [100, 'Degree is too long'],
                    },
                    institution: {
                        type: String,
                        required: [true, 'Institution name is required'],
                        trim: true,
                        minlength: [2, 'Institution name must be at least 2 characters'],
                        maxlength: [100, 'Institution name is too long'],
                    },
                    year: {
                        type: Number,
                        min: [1900, 'Please enter a valid year (1900-2100)'],
                        max: [2100, 'Please enter a valid year (1900-2100)'],
                    },
                    gpa: {
                        type: Number,
                        min: [0, 'GPA must be between 0 and 4.0'],
                        max: [4, 'GPA must be between 0 and 4.0'],
                    },
                },
            ],
            template: {
                type: String,
                enum: {
                    values: ['modern', 'minimal', 'creative'],
                    message: 'Please select a valid template',
                },
                default: 'modern',
            },
            isPublished: {
                type: Boolean,
                default: false,
            },
            theme: {
                primaryColor: {
                    type: String,
                    default: '#F4A6B5',
                    match: [/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'],
                },
                secondaryColor: {
                    type: String,
                    default: '#E8B4B8',
                    match: [/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'],
                },
            },
        },
        views: {
            type: Number,
            default: 0,
        },
        analytics: {
            views: [
                {
                    timestamp: { type: Date, default: Date.now },
                    ip: { type: String },
                    userAgent: { type: String },
                    referrer: { type: String },
                },
            ],
            clicks: [
                {
                    link: { type: String },
                    timestamp: { type: Date, default: Date.now },
                },
            ],
        },
    },
    { timestamps: true }
);

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