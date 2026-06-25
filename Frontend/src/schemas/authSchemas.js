import { z } from 'zod';

// Signup Schema
export const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username cannot exceed 20 characters')
            .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .trim()
            .toLowerCase(),

        email: z
            .string()
            .email('Please enter a valid email address')
            .toLowerCase()
            .trim(),

        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),

        confirmPassword: z
            .string()
            .min(6, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .min(6, 'Password must be at least 6 characters'),
});

// Forgot Password Schema (optional)
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .toLowerCase()
        .trim(),
});