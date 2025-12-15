import z from 'zod';

export const emailSchema = z.object({
  email: z.email(),
});

export type EmailSchema = z.infer<typeof emailSchema>;
