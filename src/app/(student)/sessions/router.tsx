export const SessionsRouter = [
  {
    path: "",
    lazy: () => import("./page"),
  },
  {
    path: ":sessionId/exams",
    lazy: () => import("./exams/page"),
  },
  // Exam for akademik
  {
    path: ":sessionId/exams/test-akademik/:examId",
    lazy: () => import("./exams/start-akademik/page"),
  },
  {
    path: ":sessionId/exams/test-psikolog/:examId",
    lazy: () => import("./exams/start-psikolog/page"),
  },
  {
    path: ":sessionId/exams/result",
    lazy: () => import("./exams/result/page"),
  },
];
