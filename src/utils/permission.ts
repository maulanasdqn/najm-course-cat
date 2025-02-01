import PermissionsEnum from "@/commons/enums/permission";
import { hasCommonElements } from "./has-common-element";
import { UserCookies } from "@/libs/cookies";
import { redirect } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";

type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions?: Array<string>;
  customCondition?: boolean;
};

/**
 * Checks if the user has the required permissions and meets a custom condition.
 *
 * @param {Object} params - The parameters for the permission check.
 * @param {string[]} params.permissions - The required permissions.
 * @param {string[]} params.userPermissions - The user's permissions.
 * @param {boolean} [params.customCondition=true] - An optional custom condition that must also be met.
 * @returns {boolean} - Returns `true` if the user has the required permissions and meets the custom condition, otherwise `false`.
 *
 * @example
 * const permissions = ['read', 'write'];
 * const userPermissions = ['read', 'delete'];
 * const customCondition = true;
 * const hasAccess = checkPermission({ permissions, userPermissions, customCondition });
 * console.log(hasAccess); // Output: true
 */
export const checkPermission = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasPermission = hasCommonElements(permissions, userPermissions);
  return hasPermission && customCondition;
};

// Purpose: Filter Allowed Permissions for a user, support nested permissions
// How To Use:
// const session = useSession();
//
// filterPermission(session.data.permissions, (permission) => {
//  return Permissions.includes(permission);
// })

type Permission = Record<string, unknown>;

type PermissionWithoutChildren = Permission;

type PermissionWithChildren = Permission & {
  children: (PermissionWithChildren | PermissionWithoutChildren)[];
};

const isPermissionWithChildren = (
  permission: PermissionWithChildren | PermissionWithoutChildren,
): permission is PermissionWithChildren => {
  return "children" in permission;
};

export const filterPermission = <T extends PermissionWithChildren | PermissionWithoutChildren>(
  menus: T[],
  hasPermissionCB: (menu: T) => boolean,
): T[] => {
  return menus.reduce((all, menu) => {
    // Check permission type and length
    if (isPermissionWithChildren(menu) && menu.children.length > 0) {
      const children = filterPermission(menu.children as T[], hasPermissionCB);
      if (children.length > 0) {
        const currentPermission = menu;
        currentPermission.children = children;
        all.push(currentPermission);
      }
      // check permission through callback
    } else if (hasPermissionCB(menu)) {
      all.push(menu);
    }
    return all;
  }, [] as T[]);
};

export const permissionLoader = (allowedPermission: PermissionsEnum[]) => {
  return async () => {
    const userData = UserCookies.get();
    const permissions = userData?.role.permissions;

    const permissionsRequired = Array.from(allowedPermission);

    for (let j = 0; j < permissionsRequired?.length; j++) {
      if (permissions.some((permission) => permission.name === permissionsRequired[j])) {
        permissionsRequired.splice(j, 1);
        j -= 1;
      }
    }

    const allowed = permissionsRequired.length === 0;

    if (!allowed) {
      return redirect(ROUTES.ADMIN.DASHBOARD.URL);
    }
    return null;
  };
};
