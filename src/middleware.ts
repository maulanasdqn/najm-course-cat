import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { AccessTokenCookies, UserCookies } from "./libs/cookies";
import { filterPermission } from "./utils/permission";
import { PERMISSIONS } from "./commons/constants/permissions";

const mappingRoutePermissions = [
  {
    path: ROUTES.ADMIN.DASHBOARD.URL,
  },
  {
    path: ROUTES.ADMIN.IAM.USERS.LIST.URL,
    permissions: [PERMISSIONS.USERS.READ_USERS],
  },
];

const mappingPublicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/confirm-payment",
];

const isAdminRoute = (pathname: string) => pathname.startsWith("/admin");
const isStudentRoute = (pathname: string) => pathname.startsWith("/student");

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const session = AccessTokenCookies.get();
  const userData = UserCookies.get();
  const userPermissions = userData?.role?.permissions?.map((perm) => perm.name) || [];
  const isAdmin = userData?.role?.name.toLowerCase().includes("admin");

  const pathname = url.pathname;

  // Allow public routes
  if (mappingPublicRoutes.includes(pathname) && !session) {
    return null;
  }

  // Redirect to login if no session
  if (!session) {
    return redirect(ROUTES.AUTH.LOGIN.URL);
  }

  // Handle role-based routing
  if (isAdmin && !isAdminRoute(pathname)) {
    return redirect(ROUTES.ADMIN.DASHBOARD.URL); // Redirect admins to admin dashboard
  }

  if (!isAdmin && !isStudentRoute(pathname)) {
    return redirect(ROUTES.STUDENT.DASHBOARD.URL); // Redirect non-admins to student dashboard
  }

  // Check route permissions
  const allowedPermissions = filterPermission(
    mappingRoutePermissions,
    (route) =>
      (session && route.path === pathname && route.permissions
        ? route.permissions.some((permission) => userPermissions.includes(permission))
        : true) || false,
  );

  if (allowedPermissions.length === 0) {
    return redirect(isAdmin ? ROUTES.ADMIN.DASHBOARD.URL : ROUTES.STUDENT.DASHBOARD.URL);
  }

  return null;
};
