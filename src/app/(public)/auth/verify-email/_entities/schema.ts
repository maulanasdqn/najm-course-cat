import { z } from "zod";
import { ZodMessagesId } from "../../../../../commons/constants/zod-messages-id";

export const verifyEmailSchema = z.object({
  otp: z.number().min(0).max(999999, { message: ZodMessagesId.invalid }),
  email: z.string().email({ message: ZodMessagesId.string.email }),
});