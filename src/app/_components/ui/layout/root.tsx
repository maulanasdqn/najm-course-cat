import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import { Toaster } from "react-hot-toast";

export const RootLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions = userData?.role.permissions?.map((perm) => perm.name) || [];

  console.log(userPermissions);

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
