import { useForm } from "react-hook-form";
import { usePostNewPassword } from "./use-post-new-password";
import { TSetNewPasswordParam } from "@/api/auth/type";

export const useResetPassword = () => {
  const form = useForm({
    defaultValues: {
      password: "",
      token: "",
    },
  });

  const { mutate: mutatePostNewPassword, isPending } = usePostNewPassword();

  const handler = {
    onSubmit: form.handleSubmit((data: TSetNewPasswordParam) => {
      mutatePostNewPassword(data);
    }),
  };

  return {
    form,
    handler,
    isPending,
  };
};
