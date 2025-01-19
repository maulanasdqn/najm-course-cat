import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z.string().min(1, { message: "First name is required" }),
    interests: z.array(z.string()).min(1, { message: "At least one interest is required" }),
    referralCode: z.string().min(1, { message: "Referral code is required" }),
    terms: z.boolean().refine((value) => value, {
      message: "You must agree to the terms and conditions",
    }),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required" })
      .max(15, { message: "Phone number must be at most 15 characters" }),
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
    studentType: z.string().min(1, { message: "Student type is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
