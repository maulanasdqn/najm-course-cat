import { z } from "zod";
import { ZodMessagesId } from "../../../../commons/constants/zod-messages-id";

const baseUserSchema = z.object({
  avatar: z.string().optional(),
  fullname: z
    .string()
    .min(3, ZodMessagesId.string.min(3))
    .max(50, ZodMessagesId.string.max(50)),
  email: z.string().email(ZodMessagesId.string.email).min(1, ZodMessagesId.required),
  phone_number: z
    .string()
    .min(10, ZodMessagesId.phone.length)
    .max(15, ZodMessagesId.phone.length)
    .regex(/^[0-9]+$/, ZodMessagesId.phone.format),
  role_id: z.string().min(1, ZodMessagesId.required),
  referral_code: z.string().optional(),
  referred_by: z.string().optional(),
  student_type: z.string().min(1, ZodMessagesId.student.type),
});

const passwordSchema = z
  .string()
  .min(8, ZodMessagesId.password.min)
  .regex(/[A-Z]/, ZodMessagesId.password.uppercase)
  .regex(/[a-z]/, ZodMessagesId.password.lowercase)
  .regex(/[0-9]/, ZodMessagesId.password.number);

export const createUserSchema = baseUserSchema.extend({
  password: passwordSchema,
});

export const updateUserSchema = baseUserSchema.extend({
  password: passwordSchema.optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;