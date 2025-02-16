"use client";
import { useEffect, type FC, type ReactElement } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserCookies } from "@/libs/cookies";
import { Navbar } from "@/app/_components/ui/navbar";
import Sidebar from "@/app/_components/ui/sidebar";
import { useFullscreen } from "./_components/providers/fullscreen";

const StudentLayout: FC = (): ReactElement => {
  const userData = UserCookies.get();
  const { isFullscreen, setIsFullscreen } = useFullscreen();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userData.is_profile_completed) {
      navigate("/student/profile");
      setIsFullscreen?.(true);
    }
  }, []);

  if (!userData.is_profile_completed && location.pathname !== "/student/profile") {
    return <></>;
  }

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
