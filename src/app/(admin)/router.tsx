import AdminLayout from "./layout";
import AdminDashboard from "./dashboard/page";

export const AdminRouter = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
];
