import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

export type PostInput = z.infer<typeof postSchema>;