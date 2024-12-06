import { z } from 'zod';

export const pollSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
});
