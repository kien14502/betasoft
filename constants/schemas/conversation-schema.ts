import z from 'zod';

export const createConversationSchema = z.object({
  name: z.string().min(6),
  type_of_room: z.number(),
  members: z.array(z.string()),
  organization_id: z.string().optional(),
});

export type CreateConversationSchema = z.infer<typeof createConversationSchema>;
