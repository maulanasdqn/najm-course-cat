import { useForm } from "react-hook-form";
import { TProfileDetail } from "../_schema/type";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../_schema/detail-profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";

export const useAccountSettings = () => {
  const queryClient = useQueryClient();
  const form = useForm<TProfileDetail>({
    resolver: zodResolver(userSchema),
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS.ME] });
    },
    onError: (error) => {
      toast.error(error.message || "Terjadi kesalahan saat memperbarui profil");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateProfile(data);
  });

  const handler = {
    onSubmit,
  };

  return {
    form,
    handler,
    isPending,
  };
};
