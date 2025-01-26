import AdminLayout from "./layout";
import AdminDashboard from "./dashboard/page";
import UsersPage from "./users/page";
import CreateUserPage from "./users/create/page";
import EditUserPage from "./users/[id]/edit/page";

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
                        path: "users/:id/update",
                        element: <EditUserPage />,
                    },
                ]
            }
        ],
    },
];