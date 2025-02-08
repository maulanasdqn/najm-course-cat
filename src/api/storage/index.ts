import { api } from "@/libs/axios/api";
import { TStorageUploadResponse } from "./type";

export const upload = async (file: File): Promise<TStorageUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/v1/storage/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
