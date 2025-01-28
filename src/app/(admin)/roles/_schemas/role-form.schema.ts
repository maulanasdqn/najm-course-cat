import { z } from "zod";

const baseRoleSchema = z.object({
    name: z
        .string()
        .min(3, "Role name must be at least 3 characters")
        .max(50, "Role name must not exceed 50 characters"),
    permissions: z
        .array(z.string())
        .min(1, "At least one permission must be selected"),
});

export const createRoleSchema = baseRoleSchema;
export const updateRoleSchema = baseRoleSchema;

export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;