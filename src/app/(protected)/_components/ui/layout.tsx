"use client";
import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";

export const ProtectedLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions =
    userData?.roles?.map((role) => role.permissions?.map((perm) => perm.name)).flat() || [];

  console.log(userPermissions);

  return (
    <section className="w-screen h-full p-12">
      <Outlet />
    </section>
  );
};
