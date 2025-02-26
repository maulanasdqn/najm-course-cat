import { AccessTokenCookies, RefreshTokenCookies, UserLocalStorage } from "@/libs/cookies";

export const logout = () => {
  RefreshTokenCookies.remove();
  AccessTokenCookies.remove();
  UserLocalStorage.remove();
  window.location.href = "/auth/login";
};
