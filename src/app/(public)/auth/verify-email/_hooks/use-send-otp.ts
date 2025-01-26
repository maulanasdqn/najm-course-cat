import { postSendOtp } from "@/api/auth/api";
import { TSendOtpParam } from "@/api/auth/type";
import { useMutation } from "@/app/_hooks/request/use-mutation";
import toast from "react-hot-toast";

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ["post-send-otp"],
    mutationFn: (payload: TSendOtpParam) => postSendOtp(payload),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Terjadi Kesalahan");
    },
  });
};
