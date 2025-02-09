import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  updateUserSchema,
  CreateUserFormData,
  UpdateUserFormData,
} from "../_schemas/user-form.schema";
import { InputText } from "@/app/_components/ui/inputs/text";
import { Select } from "@/app/_components/ui/inputs/select";
import { useRoleOptions } from "../_hooks/use-role-options";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { upload } from "@/api/storage";
import toast from "react-hot-toast";
import { InputWrap } from "@/app/_components/ui/inputs/wrap";

const studentTypeOptions = [
  { value: "polri", label: "Polri" },
  { value: "tni", label: "TNI" },
  { value: "cpns", label: "CPNS" },
  { value: "kedinasan", label: "Kedinasan" },
];

interface CreateFormProps {
  isEditMode: false;
  initialData?: Partial<CreateUserFormData>;
  onSubmit: (data: CreateUserFormData) => void;
  isLoading?: boolean;
}

interface EditFormProps {
  isEditMode: true;
  initialData?: Partial<UpdateUserFormData>;
  onSubmit: (data: UpdateUserFormData) => void;
  isLoading?: boolean;
}

type UserFormProps = CreateFormProps | EditFormProps;

type FormData = CreateUserFormData & UpdateUserFormData;

export function UserForm(props: UserFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(props.isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: props.initialData,
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

  const avatar = form.watch("avatar");

  const { options: roleOptions } = useRoleOptions();

  const onSubmit = (data: FormData) => {
    if (props.isEditMode) {
      props.onSubmit(data as UpdateUserFormData);
    } else {
      props.onSubmit(data as CreateUserFormData);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center pb-4">
        <div
          className="flex w-[100px] h-[100px] rounded-full bg-gray-100 items-center justify-center"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={avatar || "/profile.png"}
            alt="profile"
            className="w-full h-full object-cover cursor-pointer"
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        <label className="text-gray-700">Unggah Foto</label>
        <p className="text-[10px] px-4 font-normal text-center text-gray-400">
          <InputWrap message={form.formState.errors.avatar?.message}>
            Image size should be under 1MB and image ration needs to be 1:1
          </InputWrap>
        </p>
      </div>
      <InputText
        name="fullname"
        control={form.control}
        label="Nama"
        placeholder="Masukan Nama Lengkap"
      />

      <InputText
        name="email"
        control={form.control}
        label="Email"
        type="email"
        placeholder="Masukan Email Aktif"
      />

      <InputText
        name="phone_number"
        control={form.control}
        label="Nomor Telp."
        type="number"
        placeholder="08xxxxxxxxxx"
      />

      <InputText
        name="password"
        control={form.control}
        label="Password"
        type="password"
        placeholder="**********"
      />

      <Select
        name="role_id"
        control={form.control}
        label="Role"
        placeholder="Pilih Role"
        options={roleOptions}
      />

      <Select
        name="student_type"
        control={form.control}
        label="Kategori"
        placeholder="Pilih Kategori"
        options={studentTypeOptions}
      />

      <InputText
        name="referral_code"
        control={form.control}
        label="Kode Referal"
        placeholder="Masukan Kode Referal"
      />

      <InputText
        name="referred_by"
        control={form.control}
        label="Kode Referal Pemberi"
        placeholder="Masukan Kode Referal Pemberi"
      />

      <div>
        <button
          type="submit"
          disabled={props.isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {props.isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
