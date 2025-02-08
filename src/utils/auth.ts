import { AccessTokenCookies, RefreshTokenCookies, UserCookies } from "@/libs/cookies";

export const logout = () => {
  RefreshTokenCookies.remove();
  AccessTokenCookies.remove();
  UserCookies.remove();
  window.location.href = "/auth/login";
};
