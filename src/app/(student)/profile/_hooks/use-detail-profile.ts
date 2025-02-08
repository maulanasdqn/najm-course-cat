import { useForm } from "react-hook-form";
import { TProfileDetail } from "../_schema/type";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../_schema/detail-profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";
import { upload } from "@/api/storage";
import { useEffect } from "react";
import { useMe } from "./use-me";

export const useAccountSettings = () => {
  const queryClient = useQueryClient();
  const me = useMe();
  const form = useForm<TProfileDetail>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (me.data?.data) {
      form.reset(me.data?.data);
    }
  }, [me.data?.data?.id]);

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

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: upload,
    onSuccess: (data) => {
      form.setValue("avatar", data.data.file_url);
      toast.success("Foto profil berhasil diunggah");
    },
    onError: (error) => {
      toast.error(error.message || "Terjadi kesalahan saat mengunggah foto");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateProfile(data);
  });

  const handleUploadAvatar = (file: File) => {
    if (file.size > 1024 * 1024) {
      toast.error("Ukuran file maksimal 1MB");
      return;
    }
    uploadAvatar(file);
  };

  const handler = {
    onSubmit,
    onUploadAvatar: handleUploadAvatar,
  };

  return {
    form,
    handler,
    isPending: isPending || isUploading || me.isLoading,
  };
};
