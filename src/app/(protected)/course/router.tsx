import { PREFIX } from "@/commons/constants/prefix";

export const CourseRouter = [
  {
    path: PREFIX.COURSE,
    lazy: () => import("./page"),
  },
];
