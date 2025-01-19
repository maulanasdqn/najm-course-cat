import { FC, ReactElement, ReactNode, useState } from "react";
import clsx from "clsx";
import { DashboardIcon } from "../icons/ic-dashboard";
import { SettingIcon } from "../icons/ic-setting";
import { MyCourseIcon } from "../icons/ic-my-course";
import { ROUTES } from "@/commons/constants/routes";

type TSidebarItem = {
  icon: ReactNode;
  label: string;
  notification?: number;
  active?: boolean;
  link?: string;
};

export const Sidebar: FC = (): ReactElement => {
  const pathname = window.location.pathname;
  const [isOpen, setIsOpen] = useState(true);

  const sidebarItems: TSidebarItem[] = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      active: pathname === ROUTES.DASHBOARD.URL,
      link: ROUTES.DASHBOARD.URL,
    },
    {
      icon: <MyCourseIcon />,
      label: "Kursus Saya",
      active: pathname === ROUTES.COURSE.URL,
      link: ROUTES.COURSE.URL,
    },
    {
      icon: <SettingIcon />,
      label: "Pengaturan Akun",
      link: ROUTES.SETTINGS.URL,
      active: pathname === ROUTES.SETTINGS.URL,
    },
  ];

  return (
    <div
      className={clsx(
        "min-h-screen bg-white shadow flex flex-col transition-all duration-300",
        isOpen ? "w-60" : "w-20",
      )}
    >
      {/* Logo & Toggle Button */}
      <div className="flex justify-between px-4 border-b">
        {isOpen && <span className="flex items-center text-sm text-blue-500"></span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 mt-4">
        {sidebarItems.map((item, index) => (
          <a
            href={item.link || "#"}
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
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
