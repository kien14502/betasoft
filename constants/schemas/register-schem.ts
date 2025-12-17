import z from 'zod';
import { emailRegex, specialCharRegex } from '../regex';

export const registerSchema = z.object({
  email: z.string().regex(emailRegex, 'Invalid email address'),
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  agreement: z.literal(true, {
    error: 'You must accept the terms and conditions',
  }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().min(1, 'Verification code is required'),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;

export const createAccountSchema = z.object({
  agreement: z.literal(true, {
    error: 'You must accept the terms and conditions',
  }),
  email: z.string().regex(emailRegex, 'Invalid email address'),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().regex(emailRegex, 'Invalid email address'),
  code: z.string().length(6),
  step: z.number(),
});
export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      // Use the password regex for complexity check
      .regex(
        specialCharRegex,
        'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
      )
      .max(30),

    confirmPassword: z.string().min(6, 'Confirm password must be at least 8 characters long'), // Match min length of password

    fullname: z
      .string()
      .min(2, 'Full name must be at least 2 characters long')
      .max(100, 'Full name cannot exceed 100 characters'),
    step: z.number(),
  })
  // Refine the entire object to check if password and confirmPassword match
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Set the error message on the confirmPassword field
  });
export type CreatePasswordSchema = z.infer<typeof createPasswordSchema>;
