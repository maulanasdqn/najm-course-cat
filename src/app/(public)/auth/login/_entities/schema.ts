import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
  remember: z.boolean().optional(),
  password: z.string().min(1, { message: "Password is required" }),
});
