import z from 'zod';
import { emailRegex } from '../regex';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(emailRegex, 'Email is not valid'),
  password: z.string().min(1, 'Password is required'),
  agreement: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
