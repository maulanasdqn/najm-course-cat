import { postRegister } from "@/api/auth/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const POST_REGISTER_MUTATION_KEY = ["post-register"];

export const usePostRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: POST_REGISTER_MUTATION_KEY,
    mutationFn: postRegister,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate("/auth/verify-email");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message as string);
    },
  });
};
