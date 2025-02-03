import { useForm } from "react-hook-form";
import { usePostNewPassword } from "./use-post-reset-password";
import { TResetPasswordParam } from "@/api/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../_entities/scheme";

export const useResetPassword = () => {
  const form = useForm({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      token: "",
    },
  });

  const { mutate: mutatePostNewPassword, isPending } = usePostNewPassword();

  const handler = {
    onSubmit: form.handleSubmit((data: TResetPasswordParam) => {
      mutatePostNewPassword({
        password: data.password,
        token: form.getValues("token"),
      });
    }),
  };

  return {
    form,
    handler,
    isPending,
  };
};
