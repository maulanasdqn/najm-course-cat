"use client";
import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import Navbar from "@/app/_components/ui/navbar";
import Sidebar from "@/app/_components/ui/sidebar";

const StudentLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions = userData?.role?.permissions?.map((perm) => perm.name) || [];

  console.log(userPermissions);

  return (
    <section>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <Outlet />
      </div>
    </section>
  );
};

export default StudentLayout;

