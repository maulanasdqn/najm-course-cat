import AdminLayout from "./layout";
import AdminDashboard from "./dashboard/page";
import UsersPage from "./users/page";
import CreateUserPage from "./users/create/page";
import EditUserPage from "./users/[id]/edit/page";
import UserDetailPage from "./users/[id]/detail/page";
import RolesPage from "./roles/page";
import CreateRolePage from "./roles/create/page";
import EditRolePage from "./roles/[id]/edit/page";
import PermissionsPage from "./permissions/page";
import CreatePermissionPage from "./permissions/create/page";
import EditPermissionPage from "./permissions/[id]/edit/page";

export const AdminRouter = [
    {
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "iam",
                children: [
                    {
                        path: "users",
                        element: <UsersPage />,
                    },
                    {
                        path: "users/create",
                        element: <CreateUserPage />,
                    },
                    {
                        path: "users/:id/detail",
                        element: <UserDetailPage />,
                    },
                    {
                        path: "users/:id/update",
                        element: <EditUserPage />,
                    },
                    {
                        path: "roles",
                        element: <RolesPage />,
                    },
                    {
                        path: "roles/create",
                        element: <CreateRolePage />,
                    },
                    {
                        path: "roles/:id/update",
                        element: <EditRolePage />,
                    },
                    {
                        path: "permissions",
                        element: <PermissionsPage />,
                    },
                    {
                        path: "permissions/create",
                        element: <CreatePermissionPage />,
                    },
                    {
                        path: "permissions/:id/update",
                        element: <EditPermissionPage />,
                    },
                ]
            }
        ],
    },
];