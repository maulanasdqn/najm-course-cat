import { z } from "zod";
import { ZodMessagesId } from "../../../../commons/constants/zod-messages-id";

// This schema is used for both create and update forms
const baseRoleSchema = z.object({
  name: z
    .string()
    .min(3, ZodMessagesId.string.min(3))
    .max(50, ZodMessagesId.string.max(50)),
  permissions: z.array(z.string()).min(1, "Minimal satu izin harus dipilih"),
});

export const createRoleSchema = baseRoleSchema;
export const updateRoleSchema = baseRoleSchema;

export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;