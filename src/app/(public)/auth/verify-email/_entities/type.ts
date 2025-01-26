import { z } from "zod";
import { verifyEmailSchema } from "./schema";

export type TVerifyEmail = z.infer<typeof verifyEmailSchema>;
