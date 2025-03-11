import { postRegister } from "@/api/auth/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const POST_REGISTER_MUTATION_KEY = ["post-register"];

// TODO: request response email to BE, and remove this email param
export const usePostRegister = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: POST_REGISTER_MUTATION_KEY,
    mutationFn: postRegister,
    onSuccess: (res) => {
      toast.success(res.message);
      const params = new URLSearchParams({
        email,
      });
      navigate("/auth/verify-email?" + params.toString());
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message as string);
    },
  });
};
