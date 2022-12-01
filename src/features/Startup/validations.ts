import * as z from 'zod';

export const DbValidationObject = z.object({
  db: z.string().min(4, { message: 'Database name is required!' }),
  pass: z.string().min(4, { message: 'Password is required!' }),
  user: z.string().min(1, { message: 'Username is required!' }),
  url: z.string().min(1, { message: 'Database url is required!' }),
});
