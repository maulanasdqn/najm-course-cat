import { z } from "zod";
import { ZodMessagesId } from "../../../../commons/constants/zod-messages-id";

export const createTestFormSchema = z
  .object({
    category: z
      .string({ message: ZodMessagesId.required })
      .min(1, { message: ZodMessagesId.required }),
    session_id: z.string().optional(),
    test_name: z
      .string({ message: ZodMessagesId.required })
      .min(1, { message: ZodMessagesId.required }),
    // Check the validation rules
    questions: z.array(
      z.object({
        index: z.number().optional(),
        discussion: z.string().optional(),
        discussion_image_url: z.string().default(""),
        question: z
          .string({ message: ZodMessagesId.required })
          .min(1, { message: ZodMessagesId.required }),
        image_url: z.string().default(""),
        id: z.string().optional(),
        options: z.array(
          z.object({
            index: z.number().optional(),
            label: z
              .string({ message: ZodMessagesId.required })
              .min(1, { message: ZodMessagesId.required }),
            is_correct: z.boolean().default(false),
            image_url: z.string().default(""),
            id: z.string().optional(),
            points: z.number().optional(),
          }),
        ),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.category === "psikologi") {
      data.questions.forEach((question, qIndex) => {
        question.options.forEach((option, oIndex) => {
          if (option.points === undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: ZodMessagesId.test.points,
              path: ["questions", qIndex, "options", oIndex, "points"],
            });
          }
        });
      });
    }
  });

export const updateTestFormSchema = createTestFormSchema;

export type CreateTestFormData = z.infer<typeof createTestFormSchema>;
export type UpdateTestFormData = z.infer<typeof updateTestFormSchema>;
