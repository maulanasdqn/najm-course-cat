import { z } from "zod";

export const createTestFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
});

export const updateTestFormSchema = createTestFormSchema;

export type CreateTestFormData = z.infer<typeof createTestFormSchema>;
export type UpdateTestFormData = z.infer<typeof updateTestFormSchema>;
