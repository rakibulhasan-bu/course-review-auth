import { z } from "zod";

const logInValidation = z.object({
  body: z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
  }),
});

export const authValidations = { logInValidation };
