import { z } from "zod";
import { loginSchema } from "./schema";

export type TLogin = z.infer<typeof loginSchema>;
