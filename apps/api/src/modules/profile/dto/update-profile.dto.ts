import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .optional(),
  description: z.string().optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
