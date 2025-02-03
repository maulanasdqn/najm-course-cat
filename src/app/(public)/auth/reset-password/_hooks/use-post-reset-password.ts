import { postResetPassword as postNewPassword } from "@/api/auth/api";
import { useMutation } from "@/app/_hooks/request/use-mutation";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePostNewPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-new-password"],
    mutationFn: postNewPassword,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate(ROUTES.AUTH.LOGIN.URL);
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Terjadi Kesalahan");
    },
  });
};
