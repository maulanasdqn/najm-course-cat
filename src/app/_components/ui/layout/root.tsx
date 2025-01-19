import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const RootLayout: FC = (): ReactElement => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
