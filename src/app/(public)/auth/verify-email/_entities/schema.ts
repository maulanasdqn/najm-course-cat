import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z.number().min(0).max(999999, { message: "OTP is invalid" }),
  email: z.string().email({ message: "Email is invalid" }),
});
