import { z } from "zod";

export const createSessionTestFormSchema = z.object({
  session_name: z.string().min(1, "Name is required"),
  student_type: z.string().min(1, "Jenis siswa wajib diisi"),
  description: z.string().min(1, "Description is required"),
  is_active: z.boolean().default(false),
  tests: z
    .array(
      z.object({
        id: z.string().min(1, "Id is required"),
        start_date: z.string().min(1, "Start date is required"),
        end_date: z.string().min(1, "End date is required"),
      }),
    )
    .optional(),
});

export const updateSessionTestFormSchema = createSessionTestFormSchema;

export type CreateSessionTestFormData = z.infer<typeof createSessionTestFormSchema>;
export type UpdateSessionTestFormData = z.infer<typeof updateSessionTestFormSchema>;
