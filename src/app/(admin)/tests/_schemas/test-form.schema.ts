import { z } from "zod";

export const createTestFormSchema = z.object({
  session_id: z.string().optional(),
  test_name: z.string(),
  questions: z.array(
    z.object({
      index: z.number().optional(),
      discussion: z.string().optional(),
      discussion_image_url: z.string().default(""),
      question: z.string().min(1, { message: "Required" }),
      image_url: z.string().default(""),
      id: z.string().optional(), // Add id to questions
      options: z.array(
        z.object({
          index: z.number().optional(),
          label: z.string().min(1, { message: "Required" }),
          is_correct: z.boolean().default(false),
          image_url: z.string().default(""),
          id: z.string().optional(), // Add id to questions
        }),
      ),
    }),
  ),
});

export const updateTestFormSchema = createTestFormSchema;

export type CreateTestFormData = z.infer<typeof createTestFormSchema>;
export type UpdateTestFormData = z.infer<typeof updateTestFormSchema>;