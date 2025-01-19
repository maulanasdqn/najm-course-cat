import { postRegister } from "@/api/auth/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const usePostRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postRegister,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate("/auth/login");
    },
    onError: () => {
      toast.error("Terjadi Kesalahan");
    },
  });
};
