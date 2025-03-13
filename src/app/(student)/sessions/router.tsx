export const SessionsRouter = [
  {
    path: "",
    lazy: () => import("./page"),
  },
  {
    path: ":sessionId/exams",
    lazy: () => import("./exams/page"),
  },
  {
    path: ":sessionId/exams/:examId/start",
    lazy: () => import("./exams/start/page"),
  },
  {
    path: ":sessionId/result/:answerId",
    lazy: () => import("./result/page"),
  },
];
