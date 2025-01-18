import { router } from "./app";
import { createRoot } from "react-dom/client";
import { AppError } from "./app/_components/ui/app-error";
import { StrictMode } from "react";
import { AppLoading } from "./app/_components/ui/app-loading";
import { AppBoundary } from "./app/_components/ui/app-boundary";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./libs/react-query/react-query-provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppBoundary error={<AppError />} loading={<AppLoading />}>
        <RouterProvider router={router} />
      </AppBoundary>
    </ReactQueryProvider>
  </StrictMode>,
);
