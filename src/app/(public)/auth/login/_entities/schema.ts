import { z } from "zod";
import { ZodMessages } from "../../../../../commons/constants/zod-messages";

export const loginSchema = z.object({
  email: z.string().email({ message: ZodMessages.string.email }).min(1, { message: ZodMessages.required }),
  remember: z.boolean().optional(),
  password: z.string().min(1, { message: ZodMessages.password.required }),
});