import { PREFIX } from "@/commons/constants/prefix";

export const DashboardRouter = [
  {
    path: PREFIX.DASHBOARD,
    lazy: () => import("./page"),
  },
];
