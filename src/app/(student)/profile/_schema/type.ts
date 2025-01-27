import { z } from "zod";
import userSchema from "./detail-profile.schema";

export type TProfileDetail = z.infer<typeof userSchema>;
