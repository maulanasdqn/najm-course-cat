import { FC, ReactElement } from "react";
import { ROUTES } from "@/commons/constants/routes";
import { match } from "ts-pattern";
import { useLocation } from "react-router-dom";
import { LogoutIcon } from "../icons/ic-logout";
import { logout } from "@/utils/auth";
import { UserLocalStorage } from "@/libs/cookies";

export const Navbar: FC = (): ReactElement => {
  const userData = UserLocalStorage.get();
  const { pathname } = useLocation();

  const isDashboard = pathname === ROUTES.STUDENT.DASHBOARD.URL;

  const title = match(pathname)
    .with(ROUTES.STUDENT.DASHBOARD.URL, () => "Dashboard")
    .otherwise(() => "Dashboard");
  return (
    <nav className="flex items-center justify-center px-16 py-4 bg-white w-full sticky top-0 z-10">
      <div className="max-w-7xl w-full flex items-center justify-between">
        {isDashboard ? (
          <div>
            <h2 className="text-sm text-gray-500">Welcome</h2>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
          </div>
        ) : (
          <h1 className="text-xl font-bold text-primary">{title}</h1>
        )}

        <div className="flex items-center space-x-6">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3.001 3.001 0 01-6 0m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-orange-500"></span>
          </div>

          <img
            src={userData.avatar || "/profile.png"}
            alt="Profile"
            width={40}
            height={40}
            className="h-10 w-10 bg-gray-100 rounded-full object-cover"
          />

          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 text-primary font-semibold"
          >
            <LogoutIcon />
            <span className="text-sm">Sign-out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
