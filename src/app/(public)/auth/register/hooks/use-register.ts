import { useForm } from "react-hook-form";
import { TRegister } from "../entities/type";
import { registerSchema } from "../entities/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegister = () => {
  const form = useForm<TRegister>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      interests: [],
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
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
