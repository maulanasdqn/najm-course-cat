export const ExamsRouter = [
  {
    path: "",
    lazy: () => import("./page"),
  },
  {
    path: "start",
    lazy: () => import("./start/page"),
  },
  {
    path: ":questionId",
    lazy: () => import("./page"),
  },
  {
    path: "summary",
    lazy: () => import("./summary/page"),
  },
];
