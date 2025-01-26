import { postVerifyEmail } from "@/api/auth/api";
import { TVerifyEmailParam } from "@/api/auth/type";
import { useMutation } from "@/app/_hooks/request/use-mutation";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePostVerifyEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-verify-email"],
    mutationFn: (payload: TVerifyEmailParam) => postVerifyEmail(payload),
    onSuccess: (res) => {
      toast.success(res.message);
      navigate(ROUTES.AUTH.LOGIN.URL);
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Terjadi Kesalahan");
    },
  });
};
