import { z } from 'zod';

export const questionSchema = z.object({
  questionTxt: z.string(),
  choices: z.string(),
  order: z.number(),
});
