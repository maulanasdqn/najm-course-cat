import { postLogin } from "@/api/auth/api";
import { TLoginParam, TLoginResponse } from "@/api/auth/type";
import { AccessTokenCookies, RefreshTokenCookies, UserCookies } from "@/libs/cookies";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  unknown,
  TLoginParam,
  unknown
> => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: (payload) => postLogin(payload),
    onSuccess: (res) => {
      AccessTokenCookies.set(res.data.access_token);
      RefreshTokenCookies.set(res.data.refresh_token);
      UserCookies.set(res.data.user);
      navigate("/dashboard");
    },
  });
};
