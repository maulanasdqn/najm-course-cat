import StudentLayout from "./layout";
import DashboardPage from "./dashboard/page";
import { ExamsRouter } from "./exams/router";
import { CourseRouter } from "./course/router";
import { ProfileRouter } from "./profile/router";

export const StudentRouter = [
  {
    element: <StudentLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "exams",
        children: ExamsRouter,
      },
      {
        path: "course",
        children: CourseRouter,
      },
      {
        path: "profile",
        children: ProfileRouter,
      },
    ],
  },
];
