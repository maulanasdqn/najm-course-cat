"use client";
import type { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import { Navbar } from "@/app/_components/ui/navbar";
import Sidebar from "@/app/_components/ui/sidebar";
import { useFullscreen } from "./_components/providers/fullscreen";

const StudentLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const userPermissions = userData?.role?.permissions?.map((perm) => perm.name) || [];
  const { isFullscreen } = useFullscreen();

  console.log(userPermissions);

  return (
    <section className="flex h-full flex-col w-full min-h-screen justify-start items-start bg-gray-100">
      <div className="flex w-full justify-start items-start">
        {!isFullscreen && <Sidebar />}
        <div className="w-full flex flex-col items-center justify-center">
          {!isFullscreen && <Navbar />}
          <div className="w-full flex items-center justify-center max-w-8xl px-16">
            <main className="flex flex-col items-start max-w-7xl justify-start gap-y-4 mt-1 py-6 w-full">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLayout;
