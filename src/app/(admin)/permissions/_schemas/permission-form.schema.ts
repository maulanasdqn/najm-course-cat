import { z } from "zod";
import { ZodMessagesId } from "../../../../commons/constants/zod-messages-id";

export const permissionFormSchema = z.object({
  name: z.string().min(1, ZodMessagesId.required),
});

export type TPermissionForm = z.infer<typeof permissionFormSchema>;