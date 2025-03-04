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
    path: ":sessionId/exams/:examId/detail",
    lazy: () => import("./exams/detail/page"),
  },
  {
    path: ":sessionId/exams/:examId/start",
    lazy: () => import("./exams/start/page"),
  },
  {
    path: ":sessionId/exams/:examId/start-sequence",
    lazy: () => import("./exams/start-sequence/page"),
  },
  {
    path: ":sessionId/exams/:examId/result",
    lazy: () => import("./exams/result/page"),
  },
  {
    path: ":sessionId/exams/results",
    lazy: () => import("./exams/results/page"),
  },
];
