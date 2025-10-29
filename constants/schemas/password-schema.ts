import z from 'zod';

export const changePasswordSchema = z
  .object({
    new_password: z.string().min(1, 'New Password is required'),
    old_password: z.string().min(1, 'Old Password is required'),
    confirm_password: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const createPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string().min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });
export type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>;

export const requestForgotPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    new_password: z.string().min(8, 'Password must be at least 8 characters long'),
    verify_code: z.string().min(1, 'Verification code is required'),
    step: z.number().min(1).max(3),
    confirmNewPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine((data) => data.new_password === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });
export type RequestForgotPasswordSchemaType = z.infer<typeof requestForgotPasswordSchema>;
