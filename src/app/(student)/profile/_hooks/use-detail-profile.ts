import { useForm } from "react-hook-form";
import { TProfileDetail } from "../_schema/type";

export const useAccountSettings = () => {
  const form = useForm<TProfileDetail>();
  const onSubmit = form.handleSubmit((data) => console.log(data));
  const handler = {
    onSubmit,
  };
  return {
    form,
    handler,
  };
};
