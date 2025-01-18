import { PREFIX } from "@/commons/constants/prefix";
import { ROUTES } from "@/commons/constants/routes";

export const ExamsRouter = [
  {
    path: PREFIX.EXAMS,
    lazy: () => import("./page"),
  },
  {
    path: ROUTES.EXAMS.DETAIL.URL,
    lazy: () => import("./page"),
  },
];
