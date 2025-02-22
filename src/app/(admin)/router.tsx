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
import SessionTestsPage from "./session-tests/page";
import CreateSessionTestPage from "./session-tests/create/page";
import UpdateSessionTestPage from "./session-tests/[id]/update/page";
import SessionTestDetailPage from "./session-tests/[id]/detail/page";
import { permissionLoader } from "@/utils/permission";
import PermissionsEnum from "@/commons/enums/permission";

export const AdminRouter = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "session-tests",
        element: <SessionTestsPage />,
      },
      {
        path: "session-tests/create",
        element: <CreateSessionTestPage />,
      },
      {
        path: "session-tests/:id/detail",
        element: <SessionTestDetailPage />,
      },
      {
        path: "session-tests/:id/update",
        element: <UpdateSessionTestPage />,
      },
      {
        path: "iam",
        children: [
          {
            path: "users",
            loader: permissionLoader([PermissionsEnum.ReadListUsers]),
            element: <UsersPage />,
          },
          {
            path: "users/create",
            loader: permissionLoader([PermissionsEnum.CreateUsers]),
            element: <CreateUserPage />,
          },
          {
            path: "users/:id/detail",
            loader: permissionLoader([PermissionsEnum.ReadDetailUsers]),
            element: <UserDetailPage />,
          },
          {
            path: "users/:id/update",
            loader: permissionLoader([PermissionsEnum.UpdateUsers]),
            element: <EditUserPage />,
          },
          {
            path: "roles",
            loader: permissionLoader([PermissionsEnum.ReadListRoles]),
            element: <RolesPage />,
          },
          {
            path: "roles/create",
            loader: permissionLoader([PermissionsEnum.CreateRoles]),
            element: <CreateRolePage />,
          },
          {
            path: "roles/:id/update",
            loader: permissionLoader([PermissionsEnum.UpdateRoles]),
            element: <EditRolePage />,
          },
          {
            path: "permissions",
            loader: permissionLoader([PermissionsEnum.ReadListPermissions]),
            element: <PermissionsPage />,
          },
          {
            path: "permissions/create",
            loader: permissionLoader([PermissionsEnum.CreatePermissions]),
            element: <CreatePermissionPage />,
          },
          {
            path: "permissions/:id/update",
            loader: permissionLoader([PermissionsEnum.UpdatePermissions]),
            element: <EditPermissionPage />,
          },
        ],
      },
    ],
  },
];
