import { FC, ReactElement, ReactNode } from "react";
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

  const sidebarItems: TSidebarItem[] = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      active: pathname === ROUTES.DASHBOARD.URL,
      link: ROUTES.DASHBOARD.URL,
    },

    { icon: <MyCourseIcon />, label: "Kursus Saya" },
    {
      icon: <SettingIcon />,
      label: "Pengaturan Akun",
      link: ROUTES.SETTINGS.URL,
      active: pathname === ROUTES.SETTINGS.URL,
    },
  ];

  return (
    <div className="w-full max-w-72 min-h-screen bg-white flex flex-col h-full absolute left-0 top-0 z-10">
      <img src="/logo.png" alt="logo" className="w-[160px] mb-10 mt-1 ml-4" />
      <nav className="flex flex-col flex-1">
        {sidebarItems.map((item, index) => (
          <a
            href={item.link || "#"}
            key={index}
            className={clsx(
              "flex items-center px-6 py-3 text-sm cursor-pointer hover:bg-blue-100",
              item.active ? "bg-blue-600 text-white" : "text-blue-800",
            )}
          >
            <div className="text-lg">{item.icon}</div>
            <span className="ml-4">{item.label}</span>
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
