import { useForm } from "react-hook-form";
import { usePostForgotPassword } from "./use-post-forgot-password";
import { TForgotPasswordParam } from "@/api/auth/type";

export const useForgotPassword = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { mutate: mutatePostForgotPassword, isPending } = usePostForgotPassword();

  const handler = {
    onSubmit: form.handleSubmit((data: TForgotPasswordParam) => {
      mutatePostForgotPassword(data);
    }),
  };
  return {
    form,
    handler,
    isPending,
  };
};
