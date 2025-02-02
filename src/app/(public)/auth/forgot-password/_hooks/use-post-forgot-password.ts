import { postForgotPassword } from "@/api/auth/api";
import { useMutation } from "@/app/_hooks/request/use-mutation";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePostForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-forgot-password"],
    mutationFn: postForgotPassword,
    onSuccess: (res) => {
      toast.success(res.message);
      const queryParams = new URLSearchParams({
        token: res.data.token,
      });
      navigate(`${ROUTES.AUTH.RESET_PASSWORD.URL}?${queryParams.toString()}`);
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Terjadi Kesalahan");
    },
  });
};
