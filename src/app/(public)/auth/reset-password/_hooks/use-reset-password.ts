import { useForm } from "react-hook-form";
import { usePostNewPassword } from "./use-post-new-password";
import { TSetNewPasswordParam } from "@/api/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../_entities/scheme";

export const useResetPassword = () => {
  const form = useForm({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
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
