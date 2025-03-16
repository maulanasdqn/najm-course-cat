import { z } from "zod";
import { ZodMessagesId } from "../../../../../commons/constants/zod-messages-id";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: ZodMessagesId.password.required })
      .min(6, { message: ZodMessagesId.string.min(6) }),
    confirm_password: z
      .string()
      .min(1, { message: ZodMessagesId.required })
      .min(6, { message: ZodMessagesId.string.min(6) }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ZodMessagesId.password.mismatch,
        path: ["confirm_password"],
      });
    }
  });