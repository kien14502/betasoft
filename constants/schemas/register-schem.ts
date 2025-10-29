import z from 'zod';
import { emailRegex } from '../regex';

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
