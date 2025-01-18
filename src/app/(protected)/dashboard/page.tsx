import { ROUTES } from "@/commons/constants/routes";
import { AccessTokenCookies, RefreshTokenCookies, UserCookies } from "@/libs/cookies";
import { Button } from "antd";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const Component: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handleLogout = () => {
    UserCookies.remove();
    AccessTokenCookies.remove();
    RefreshTokenCookies.remove();
    navigate(ROUTES.AUTH.LOGIN.URL);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};
