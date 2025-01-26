import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z.string().min(1, { message: "OTP Required" }),
  email: z.string().email({ message: "Email is invalid" }),
});
