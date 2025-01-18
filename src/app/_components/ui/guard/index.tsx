import { checkPermission } from "@/utils/permission";
import { FC, Fragment, PropsWithChildren, ReactElement } from "react";

type TProps = PropsWithChildren & {
  permissions: Array<string>;
  customCondition?: boolean;
};

export const Guard: FC<TProps> = (props): ReactElement => {
  const isHasAccess = checkPermission(props);
  if (isHasAccess) {
    return <Fragment>{props.children}</Fragment>;
  }
  return <Fragment />;
};
