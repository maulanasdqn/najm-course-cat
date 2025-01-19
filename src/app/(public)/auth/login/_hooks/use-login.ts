import { useForm } from "react-hook-form";
import { TLogin } from "../entities/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../entities/schema";
import { usePostLogin } from "./use-post-login";

export const useLogin = () => {
  const form = useForm<TLogin>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { mutate: postLoginMutation } = usePostLogin();

  const onSubmit = form.handleSubmit(async (data) => {
    postLoginMutation(data);
  });

  const onSubmitGoogle = async () => {};

  const handler = {
    onSubmit,
    onSubmitGoogle,
  };

  return {
    form,
    handler,
  };
};
