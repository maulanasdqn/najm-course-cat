import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { AccessTokenCookies, UserCookies } from "./libs/cookies";
import { filterPermission } from "./utils/permission";
import { PERMISSIONS } from "./commons/constants/permissions";

const mappingRoutePermissions = [
  {
    path: ROUTES.DASHBOARD.URL,
  },
  {
    path: ROUTES.IAM.USERS.LIST.URL,
    permissions: [PERMISSIONS.USERS.READ_USERS],
  },
];

const mappingPublicRoutes = ["/auth/login", "/auth/register", "/auth/verify-email"];

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const session = AccessTokenCookies.get();
  const userData = UserCookies.get();
  const userPermissions = userData?.role?.permissions?.map((perm) => perm.name) || [];

  const pathname = url.pathname;

  const allowedPermissions = filterPermission(
    mappingRoutePermissions,
    (route) =>
      (session && route.path === pathname && route.permissions
        ? route.permissions.some((permission) => permission ?? userPermissions.some(permission))
        : true) || false,
  );

  if (mappingPublicRoutes.includes(pathname)) {
    return null;
  }

  if (!session) {
    return redirect(ROUTES.AUTH.LOGIN.URL);
  }

  if (allowedPermissions.length === 0) {
    return redirect(ROUTES.DASHBOARD.URL);
  }

  return null;
};
