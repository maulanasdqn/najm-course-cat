import { createBrowserRouter } from "react-router-dom";
import { PREFIX } from "@/commons/constants/prefix";
import { AppError } from "./_components/ui/app-error";
import { AuthRouter } from "./(public)/auth/router";
import { RootLayout } from "./_components/ui/layout/root";
import { middleware } from "@/middleware";
import { AdminRouter } from "./(admin)/router";
import { StudentRouter } from "./(student)/router";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: middleware,
    shouldRevalidate: () => true,
    element: <RootLayout />,
    children: [
      {
        path: PREFIX.AUTH,
        children: AuthRouter,
      },
      {
        path: "admin",
        errorElement: <AppError />,
        children: AdminRouter,
      },
      {
        path: "student",
        errorElement: <AppError />,
        children: StudentRouter,
      },
    ],
  },
]);
