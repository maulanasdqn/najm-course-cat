import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FullscreenProvider } from "@/app/(student)/_components/providers/fullscreen";

export const RootLayout: FC = (): ReactElement => {
  return (
    <FullscreenProvider>
      <Outlet />
      <Toaster />
    </FullscreenProvider>
  );
};
