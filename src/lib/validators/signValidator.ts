import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be of 8 character" }),
});
export type TAuth = z.infer<typeof AuthCredentialsValidator>;
