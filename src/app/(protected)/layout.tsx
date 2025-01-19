"use client";
import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import Navbar from "@/app/_components/ui/navbar";
import Sidebar from "@/app/_components/ui/sidebar";

export const ProtectedLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions =
    userData?.roles?.map((role) => role.permissions?.map((perm) => perm.name)).flat() || [];

  console.log(userPermissions);

  return (
    <section>
      <Navbar accountName="Akun Gue" />
      <div className="flex ">
        <Sidebar />
        <Outlet />
      </div>
    </section>
  );
};
