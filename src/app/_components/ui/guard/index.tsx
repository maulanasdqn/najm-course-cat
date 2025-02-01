import PermissionsEnum from "@/commons/enums/permission";
import { UserCookies } from "@/libs/cookies";
import { FC, Fragment, PropsWithChildren, ReactNode, useMemo } from "react";

type TProps = PropsWithChildren<{
  permissions: Array<PermissionsEnum>;
  fallback?: ReactNode;
}>;

export const Guard: FC<TProps> = (props): ReactNode => {
  const userData = UserCookies.get();
  const permissions = userData?.role.permissions;
  const allowed = useMemo(() => {
    const permissionRequired = Array.from(props.permissions);
    for (let j = 0; j < permissionRequired?.length; j++) {
      if (permissions.some((permission) => permission.name === permissionRequired[j])) {
        permissionRequired.splice(j, 1);
        j -= 1;
      }
    }

    return permissionRequired.length === 0;
  }, [props.permissions]);
  if (allowed) {
    return <Fragment>{props.children}</Fragment>;
  }
  return props.fallback;
};
