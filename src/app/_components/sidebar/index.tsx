import { FC, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { DashboardIcon } from "../icons/ic-dashboard";
import { SettingIcon } from "../icons/ic-setting";
import { MessageIcon } from "../icons/ic-message";

import { UserManagementIcon } from "../icons/ic-user-management";
import { MyCourseIcon } from "../icons/ic-my-course";
import { EarningIcon } from "../icons/ic-earning";
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
      active: pathname === ROUTES.ADMIN.DASHBOARD,
      link: ROUTES.ADMIN.DASHBOARD,
    },

    { icon: <MyCourseIcon />, label: "My Courses" },
    { icon: <EarningIcon />, label: "Earning" },
    { icon: <MessageIcon />, label: "Message", notification: 3 },
    { icon: <UserManagementIcon />, label: "User Management" },
    {
      icon: <SettingIcon />,
      label: "Settings",
      link: ROUTES.ADMIN.SETTINGS,
      active: pathname === ROUTES.ADMIN.SETTINGS,
    },
  ];

  return (
    <div className="w-full max-w-72 min-h-screen bg-white flex flex-col h-full sticky top-0">
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
