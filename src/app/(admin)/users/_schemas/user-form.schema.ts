import { z } from "zod";

const baseUserSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must only contain digits"),
  role_id: z.string().min(1, "Role is required"),
  referral_code: z.string().optional(),
  referred_by: z.string().optional(),
  student_type: z.string().min(1, "Student type is required"),
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const createUserSchema = baseUserSchema.extend({
  password: passwordSchema,
});

export const updateUserSchema = baseUserSchema.extend({
  password: passwordSchema.optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
