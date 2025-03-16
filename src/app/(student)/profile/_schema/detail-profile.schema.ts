import { z } from "zod";
import { ZodMessagesId } from "../../../../commons/constants/zod-messages-id";

const userSchema = z.object({
  avatar: z.string().optional(),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), ZodMessagesId.invalid),
  email: z.string().email(ZodMessagesId.string.email),
  fullname: z.string().min(1, ZodMessagesId.required),
  gender: z.enum(["male", "female", "other"]),
  identity_number: z.string().min(1, ZodMessagesId.required),
  phone_number: z.string().regex(/^[0-9]+$/, ZodMessagesId.phone.format),
  religion: z.string().optional(),
  address: z.string().optional(),
  experience: z.string().optional(),
  school: z.string().optional(),
  role_id: z.string().min(1, ZodMessagesId.required),
  student_type: z.string().min(1, ZodMessagesId.student.type),
});

export default userSchema;