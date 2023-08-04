import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({required_error: "Name is required"})
      .min(1, { message: 'Name must be greater than 1 character!' }),
    email: z.string({required_error: "Email is required"}).email('Provide a valid email address'),
    password: z
      .string({required_error: "Password is required"})
      .min(4, { message: 'Password must be greater than 4 character!' }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: 'Name must be greater than 1 character!' }),
      email: z.string().email('Provide a valid email address'),
      password: z
        .string()
        .min(4, { message: 'Password must be greater than 4 character!' }),
    })
    .partial(),
});
