import { createBrowserRouter } from "react-router-dom";
import { middleware } from "@/middleware";
import { PREFIX } from "@/commons/constants/prefix";
import { AppError } from "./_components/ui/app-error";
import { ProtectedLayout } from "./(protected)/_components/ui/layout";
import { DashboardRouter } from "./(protected)/dashboard/router";
import { AuthRouter } from "./(public)/auth/router";

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
        element: <ProtectedLayout />,
        errorElement: <AppError />,
        children: [
          {
            path: PREFIX.DASHBOARD,
            children: DashboardRouter,
          },
        ],
      },
    ],
  },
]);
