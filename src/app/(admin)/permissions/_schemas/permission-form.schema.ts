import { z } from "zod";

export const permissionFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export type TPermissionForm = z.infer<typeof permissionFormSchema>;