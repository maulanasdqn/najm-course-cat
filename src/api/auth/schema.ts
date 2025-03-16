import { z } from "zod";
import { ZodMessages } from "../../commons/constants/zod-messages";

export const loginSchema = z.object({
  email: z
    .string({ required_error: ZodMessages.required })
    .min(1, { message: ZodMessages.required })
    .email({ message: ZodMessages.string.email }),
  password: z
    .string({ required_error: ZodMessages.password.required })
    .min(1, { message: ZodMessages.password.required }),
});