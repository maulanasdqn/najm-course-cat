import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import { Toaster } from "react-hot-toast";

export const RootLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions =
    userData?.roles?.map((role) => role.permissions?.map((perm) => perm.name)).flat() || [];

  console.log(userPermissions);

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
