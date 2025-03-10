import { z } from "zod";

export const createTestFormSchema = z.object({
  session_id: z.string().optional(),
  test_name: z.string(),
  questions: z.array(
    z.object({
      index: z.number().optional(),
      discussion: z.string().optional(),
      question: z.string().min(1, { message: "Required" }),
      image_url: z.string().optional().nullable(),
      options: z.array(
        z.object({
          index: z.number().optional(),
          label: z.string().min(1, { message: "Required" }),
          is_correct: z.boolean().default(false),
          image_url: z.string().optional().nullable(),
        }),
      ),
    }),
  ),
});

export const updateTestFormSchema = createTestFormSchema;

export type CreateTestFormData = z.infer<typeof createTestFormSchema>;
export type UpdateTestFormData = z.infer<typeof updateTestFormSchema>;
