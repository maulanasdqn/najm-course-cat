import StudentLayout from "./layout";
import DashboardPage from "./dashboard/page";
import { ProfileRouter } from "./profile/router";
import { SessionsRouter } from "./sessions/router";

export const StudentRouter = [
  {
    element: <StudentLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "sessions",
        children: SessionsRouter,
      },
      {
        path: "profile",
        children: ProfileRouter,
      },
    ],
  },
];
