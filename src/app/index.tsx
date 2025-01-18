import { createBrowserRouter } from "react-router-dom";
import { PREFIX } from "@/commons/constants/prefix";
import { AppError } from "./_components/ui/app-error";
import { DashboardRouter } from "./(protected)/dashboard/router";
import { AuthRouter } from "./(public)/auth/router";
import { ProtectedLayout } from "./(protected)/layout";
import { ExamsRouter } from "./(protected)/exams/router";

export const router = createBrowserRouter([
  {
    path: "/",
    // loader: middleware,
    shouldRevalidate: () => true,
    children: [
      {
        path: PREFIX.AUTH,
        children: AuthRouter,
      },
      {
        path: PREFIX.ROOT,
        errorElement: <AppError />,
        element: <ProtectedLayout />,
        children: [
          {
            path: PREFIX.DASHBOARD,
            children: DashboardRouter,
          },
          {
            path: PREFIX.EXAMS,
            children: ExamsRouter,
          },
        ],
      },
    ],
  },
]);
