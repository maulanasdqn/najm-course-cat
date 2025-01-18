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
    <section className="w-full h-full min-h-screen flex flex-col relative items-center justify-start bg-gray-100 overflow-hidden">
      <Navbar />
      <div className="flex w-full justify-start items-center ml-72 mt-6">
        <Sidebar />
        <Outlet />
      </div>
    </section>
  );
};
