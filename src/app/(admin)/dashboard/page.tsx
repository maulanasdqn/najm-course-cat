import { Link } from "react-router-dom";
import { ROUTES } from "../../../commons/constants/routes";

export default function AdminDashboard() {
    const adminMenus = [
        {
            title: "User Management",
            description: "Manage users, roles, and permissions",
            link: ROUTES.ADMIN.IAM.USERS.LIST.URL,
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
        },
        {
            title: "Role Management",
            description: "Manage user roles and permissions",
            link: ROUTES.ADMIN.IAM.ROLES.LIST.URL,
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {adminMenus.map((menu) => (
                    <Link
                        key={menu.title}
                        to={menu.link}
                        className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                            {menu.icon}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{menu.title}</h2>
                            <p className="text-sm text-gray-600">{menu.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}