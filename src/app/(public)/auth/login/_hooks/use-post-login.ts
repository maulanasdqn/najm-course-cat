import { postLogin } from "@/api/auth/api";
import { TLoginParam } from "@/api/auth/type";
import { useMutation } from "@/app/_hooks/request/use-mutation";
import { AccessTokenCookies, RefreshTokenCookies, UserLocalStorage } from "@/libs/cookies";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const POST_LOGIN_MUTATION_KEY = ["post-login"];

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: POST_LOGIN_MUTATION_KEY,
    mutationFn: (payload: TLoginParam) => postLogin(payload),
    onSuccess: (res) => {
      AccessTokenCookies.set(res.data.token.access_token);
      RefreshTokenCookies.set(res.data.token.refresh_token);
      UserLocalStorage.set(res.data.user);
      navigate(0);
    },
    onError: (err: any) => {
      if (err.response?.status === 403) {
        navigate("/student/dashboard");
        toast('Please check your email to verify your account', {
          position: 'top-center',
          duration: 5000,
        });
        return;
      }
      toast.error(err.response?.data?.message || "Terjadi Kesalahan");
    },
  });
};
