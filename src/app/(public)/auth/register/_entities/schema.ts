import { z } from "zod";
import { ZodMessages } from "../../../../../commons/constants/zod-messages";

export const registerSchema = z
  .object({
    fullname: z.string().min(1, { message: ZodMessages.required }),
    interests: z.string().optional(),
    referralCode: z.string().min(1, { message: ZodMessages.required }),
    terms: z.boolean().refine((value) => value, {
      message: ZodMessages.form.terms,
    }),
    phoneNumber: z
      .string()
      .min(1, { message: ZodMessages.phone.required })
      .max(15, { message: ZodMessages.phone.length }),
    email: z.string().email({ message: ZodMessages.string.email }).min(1, { message: ZodMessages.required }),
    password: z
      .string()
      .min(1, { message: ZodMessages.password.required })
      .min(6, { message: ZodMessages.string.min(6) }),
    confirmPassword: z.string().min(1, { message: ZodMessages.required }),
    studentType: z.string().min(1, { message: ZodMessages.student.type }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: ZodMessages.password.mismatch,
      });
    }
  });