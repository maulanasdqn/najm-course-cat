import { FC, ReactElement, ReactNode, useState } from "react";
import clsx from "clsx";
import { DashboardIcon } from "../icons/ic-dashboard";
import { MyCourseIcon } from "../icons/ic-my-course";
import { ROUTES } from "@/commons/constants/routes";
import { UserIcon } from "../icons/ic-user";
import { LogoutIcon } from "../icons/ic-logout";
import { Link, useLocation } from "react-router-dom";

type TSidebarItem = {
  icon: ReactNode;
  label: string;
  notification?: number;
  active?: boolean;
  link?: string;
  onClick?: () => void;
};

export const Sidebar: FC = (): ReactElement => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const sidebarItems: TSidebarItem[] = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      active: pathname === ROUTES.STUDENT.DASHBOARD.URL,
      link: ROUTES.STUDENT.DASHBOARD.URL,
    },
    {
      icon: <MyCourseIcon />,
      label: "Kursus Saya",
      active: pathname === ROUTES.STUDENT.COURSE.URL,
      link: ROUTES.STUDENT.COURSE.URL,
    },
    {
      icon: <MyCourseIcon />,
      label: "Daftar Sesi",
      active: pathname === ROUTES.STUDENT.SESSIONS.LIST.URL,
      link: ROUTES.STUDENT.SESSIONS.LIST.URL,
    },
    {
      icon: <UserIcon />,
      label: "Data Pengguna",
      active: pathname === ROUTES.STUDENT.PROFILE.URL,
      link: ROUTES.STUDENT.PROFILE.URL,
    },
    {
      icon: <LogoutIcon />,
      label: "Logout",
      active: false,
      link: ROUTES.AUTH.LOGOUT.URL,
    },
  ];

  return (
    <div
      className={clsx(
        "min-h-screen bg-white shadow flex flex-col transition-all h-full sticky top-0 left-0 duration-300",
        isOpen ? "w-60" : "w-20",
      )}
    >
      <div className="flex justify-between px-4 border-b">
        {isOpen && <span className="flex items-center text-sm text-blue-500"></span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      <nav className="flex flex-col flex-1 mt-4">
        {sidebarItems.map((item, index) => (
          <Link
            to={item.link || "#"}
            key={index}
            className={clsx(
              "flex items-center px-4 py-3 text-sm cursor-pointer hover:bg-blue-100",
              item.active ? "bg-blue-600 text-white" : "text-blue-800",
            )}
          >
            <div className="text-lg">{item.icon}</div>
            {isOpen && <span className="ml-4">{item.label}</span>}
            {item.notification && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {item.notification}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
