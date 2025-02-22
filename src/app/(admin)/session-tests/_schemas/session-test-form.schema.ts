import { z } from "zod";

export const createSessionTestFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
});

export const updateSessionTestFormSchema = createSessionTestFormSchema;

export type CreateSessionTestFormData = z.infer<typeof createSessionTestFormSchema>;
export type UpdateSessionTestFormData = z.infer<typeof updateSessionTestFormSchema>;
