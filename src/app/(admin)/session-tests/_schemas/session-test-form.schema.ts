import { z } from "zod";

export const createSessionTestFormSchema = z
  .object({
    session_name: z.string().min(1, "Name is required"),
    student_type: z.string().min(1, "Jenis siswa wajib diisi"),
    description: z.string().min(1, "Description is required"),
    is_active: z.boolean().default(false),
    tests: z
      .array(
        z.object({
          test_id: z.string().min(1, "Id is required"),
          weight: z.string().min(1, "Weight is required"),
          multiplier: z.string().min(1, "Multiplier is required"),
          start_date: z.string().min(1, "Start date is required"),
          end_date: z.string().min(1, "End date is required"),
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.tests || data.tests.length === 0) return true;

    // Check if total weight is less than or equal to 100
    const totalWeight = data.tests.reduce(
      (sum, test) => sum + (test.weight ? parseInt(test.weight) : 0),
      0,
    );
    console.log(totalWeight);
    data.tests.forEach((_test, i) => {
      if (totalWeight > 100) {
        ctx.addIssue({
          code: "custom",
          message: "Test weight cannot exceed 100%",
          path: ["tests", i, "weight"],
        });
      }
    });
    return;
  })
  .superRefine((data, ctx) => {
    if (!data.tests || data.tests.length <= 1) return true;

    // Check for date overlaps between tests
    for (let i = 0; i < data.tests.length; i++) {
      const test1 = data.tests[i];
      const start1 = new Date(test1.start_date);
      const end1 = new Date(test1.end_date);

      // Validate that start date is before end date for the current test
      if (start1 >= end1) {
        ctx.addIssue({
          code: "custom",
          message: "Test date ranges cannot overlap",
          path: ["tests", i, "start_date"],
        });
        return;
      }

      for (let j = i + 1; j < data.tests.length; j++) {
        const test2 = data.tests[j];
        const start2 = new Date(test2.start_date);
        const end2 = new Date(test2.end_date);

        // Check if date ranges overlap
        if ((start1 <= end2 && end1 >= start2) || (start2 <= end1 && end2 >= start1)) {
          ctx.addIssue({
            code: "custom",
            message: "Test date ranges cannot overlap",
            path: ["tests", i, "start_date"],
          });
          ctx.addIssue({
            code: "custom",
            message: "Test date ranges cannot overlap",
            path: ["tests", j, "start_date"],
          });
          return;
        }
      }
    }
    return;
  });

export const updateSessionTestFormSchema = createSessionTestFormSchema;

export type CreateSessionTestFormData = z.infer<typeof createSessionTestFormSchema>;
export type UpdateSessionTestFormData = z.infer<typeof updateSessionTestFormSchema>;
