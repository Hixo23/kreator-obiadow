import { z } from 'zod';

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
