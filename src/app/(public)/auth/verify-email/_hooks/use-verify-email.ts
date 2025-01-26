import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TVerifyEmail } from "../_entities/type";
import { usePostVerifyEmail } from "./use-post-verify-email";
import { verifyEmailSchema } from "../_entities/schema";
import { useSendOtp } from "./use-send-otp";

export const useVerifyEmail = () => {
  const form = useForm<TVerifyEmail>({
    mode: "all",
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
      email: "",
    },
  });

  const { mutate: postVerifyEmailMutation } = usePostVerifyEmail();
  const { mutate: postSendOtpMutation } = useSendOtp();

  const onSubmit = form.handleSubmit(async (data) => {
    postVerifyEmailMutation(data);
  });
  const onSendOtp = async ({ onSuccess }: { onSuccess: () => void }) => {
    postSendOtpMutation(
      { email: form.getValues("email") },
      {
        onSuccess,
      },
    );
  };

  const handler = {
    onSubmit,
    onSendOtp,
  };

  return {
    form,
    handler,
  };
};
