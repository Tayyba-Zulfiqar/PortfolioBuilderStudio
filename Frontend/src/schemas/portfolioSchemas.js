import { z } from 'zod';


// ABOUT SCHEMA

export const aboutSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(60, 'Name is too long'),
    headline: z
        .string()
        .min(4, 'Headline is required and should be at least 4 characters')
        .max(100, 'Headline is too long'),
    bio: z
        .string()
        .min(10, 'Bio is required and should be at least 10 characters')
        .max(500, 'Bio is too long'),
    location: z
        .string()
        .min(4, 'Location is required and should be at least 4 characters')
        .max(100, 'Location is too long'),
    profilePicture: z
        .string()
        .refine(
            (val) => !val || /^(https?:\/\/[^\s]+|data:image\/[a-zA-Z+]+;base64,[^\s]+)$/.test(val),
            'Invalid image URL'
        )
        .optional()
        .default(''),
});


// SOCIAL LINKS SCHEMA

export const socialLinksSchema = z.object({
    github: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal(''))
        .default(''),
    linkedin: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal(''))
        .default(''),
    twitter: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal(''))
        .default(''),
    youtube: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal(''))
        .default(''),
});


// PROJECT SCHEMA (single project)

export const projectSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title is too long'),
    description: z
        .string()
        .max(500, 'Description is too long'),
    techStack: z
        .array(z.string())
        .optional()
        .default([]),
    liveUrl: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal(''))
        .default(''),
    githubUrl: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal(''))
        .default(''),
    images: z
        .array(z.string().url())
        .optional()
        .default([]),
});


// SKILL SCHEMA (single skill)

export const skillSchema = z.object({
    name: z
        .string()
        .min(2, 'Skill name must be at least 2 characters')
        .max(50, 'Skill name is too long'),
    proficiency: z
        .enum(['Beginner', 'Intermediate', 'Expert'], {
            errorMap: () => ({ message: 'Please select a proficiency level' }),
        }),
});

// EXPERIENCE SCHEMA (single experience)

export const experienceSchema = z.object({
    title: z
        .string()
        .min(3, 'Job title must be at least 3 characters')
        .max(100, 'Job title is too long'),
    company: z
        .string()
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name is too long'),
    startDate: z
        .string()
        .min(1, 'Start date is required'),
    endDate: z
        .string()
        .nullable()
        .optional()
        .default(null),
    description: z
        .string()
        .max(500, 'Description is too long')
        .optional()
        .default(''),
    logo: z
        .string()
        .optional()
        .default(''),
}).refine((data) => {
    if (!data.endDate || !data.startDate) return true;
    return new Date(data.endDate) >= new Date(data.startDate);
}, {
    message: 'End date must be after start date',
    path: ['endDate'],
});


// EDUCATION SCHEMA (single education)

export const educationSchema = z.object({
    degree: z
        .string()
        .min(3, 'Degree must be at least 3 characters')
        .max(100, 'Degree is too long'),
    institution: z
        .string()
        .min(2, 'Institution name must be at least 2 characters')
        .max(100, 'Institution name is too long'),
    year: z
        .number({
            invalid_type_error: 'Please enter a valid year',
        })
        .min(1900, 'Please enter a valid year (1900-2100)')
        .max(2100, 'Please enter a valid year (1900-2100)')
        .optional(),
    gpa: z
        .number({
            invalid_type_error: 'Please enter a valid GPA',
        })
        .min(0, 'GPA must be between 0 and 4.0')
        .max(4, 'GPA must be between 0 and 4.0')
        .optional(),
});


// THEME SCHEMA (colors)

export const themeSchema = z.object({
    primaryColor: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color')
        .optional()
        .default('#F4A6B5'),
    secondaryColor: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color')
        .optional()
        .default('#E8B4B8'),
});

// SETTINGS SCHEMA

export const settingsSchema = z.object({
    template: z
        .enum(['modern', 'minimal', 'creative'], {
            errorMap: () => ({ message: 'Please select a template' }),
        })
        .default('modern'),
    isPublished: z
        .boolean()
        .default(false),
    theme: themeSchema.optional(),
});

// FULL PORTFOLIO SCHEMA (combines everything)

export const portfolioSchema = z.object({
    about: aboutSchema.optional().default({}),
    socialLinks: socialLinksSchema.optional().default({}),
    projects: z.array(projectSchema).optional().default([]),
    skills: z.array(skillSchema).optional().default([]),
    experience: z.array(experienceSchema).optional().default([]),
    education: z.array(educationSchema).optional().default([]),
    template: z
        .enum(['modern', 'minimal', 'creative'])
        .optional()
        .default('modern'),
    isPublished: z.boolean().optional().default(false),
    theme: themeSchema.optional().default({
        primaryColor: '#F4A6B5',
        secondaryColor: '#E8B4B8',
    }),
});


// PARTIAL SCHEMAS (for individual tab saves)


// For saving only About + Social Links
export const aboutAndSocialSchema = aboutSchema.merge(socialLinksSchema);

// For validating a single project form (modal)
export const projectFormSchema = projectSchema;

// For validating a single skill form (modal)
export const skillFormSchema = skillSchema;

// For validating a single experience form (modal)
export const experienceFormSchema = experienceSchema;

// For validating a single education form (modal)
export const educationFormSchema = educationSchema;

// For validating settings only
export const settingsFormSchema = settingsSchema;

