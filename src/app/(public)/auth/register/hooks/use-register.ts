import { useForm } from "react-hook-form";
import { TRegister } from "../entities/type";
import { registerSchema } from "../entities/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostRegister } from "./use-post-register";

export const useRegister = () => {
  const form = useForm<TRegister>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      referralCode: "",
      interests: [],
      confirmPassword: "",
      studentType: "",
    },
  });

  const { mutate: mutatePostRegister, isPending } = usePostRegister();

  const onSubmit = form.handleSubmit((data) => {
    mutatePostRegister({
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUBzC-v66B_YI30OMI1r7paQVsIIDW4exdQ&s",
      created_at: new Date().toISOString(),
      email: data.email,
      fullname: data.fullname,
      password: data.password,
      phone_number: data.phoneNumber,
      referral_code: data.referralCode,
      referred_by: data.studentType,
      student_type: data.studentType,
      interests: data.interests,
    });
  });

  const onSubmitGoogle = async () => {};

  const handler = {
    onSubmit,
    onSubmitGoogle,
  };

  return {
    form,
    handler,
    isPending,
  };
};
