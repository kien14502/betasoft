import z from 'zod';

export const createConversationSchema = z.object({
  name: z.string().min(6),
});

export type CreateConversationSchema = z.infer<typeof createConversationSchema>;
