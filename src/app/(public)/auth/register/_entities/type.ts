import { z } from "zod";
import { registerSchema } from "./schema";

export type TRegister = z.infer<typeof registerSchema>;
