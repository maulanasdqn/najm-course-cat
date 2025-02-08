import { FC, ReactElement, useRef } from "react";
import { useAccountSettings } from "./_hooks/use-detail-profile";
import { InputText } from "@/app/_components/ui/inputs/text";
import { Select } from "@/app/_components/ui/inputs/select";
import { Button } from "@/app/_components/ui/button";

export const Component: FC = (): ReactElement => {
  const { form, handler, isPending } = useAccountSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatar = form.watch("avatar");

  const studentTypeOptions = [
    { value: "polri", label: "Polri" },
    { value: "tni", label: "TNI" },
    { value: "cpns", label: "CPNS" },
    { value: "kedinasan", label: "Kedinasan" },
  ];
  const genderOption = [
    { value: "male", label: "Wanita" },
    { value: "female", label: "Laki-laki" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handler.onUploadAvatar(file);
    }
  };

  return (
    <div className="flex flex-col p-4 w-full items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-md w-full h-full p-8 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lengkapi Profil</h2>
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
              disabled={isPending}
            />
          </div>
          <label className="text-gray-700">Unggah Foto</label>
          <p className="text-[10px] px-4 font-normal text-center text-gray-400">
            Image size should be under 1MB and image ration needs to be 1:1
          </p>
        </div>
        <div className="flex flex-col w-full gap-y-6">
          <div className="flex gap-x-4">
            <InputText
              label="Email"
              control={form.control}
              name="email"
              placeholder="Masukan email"
            />
            <InputText
              type="number"
              label="Nomor Whatsapp"
              control={form.control}
              name="phone_number"
              placeholder="Your phone number"
              preppend={<span className="text-primary font-semibold text-xs">+62</span>}
            />
          </div>
          <div className="flex gap-x-4">
            <InputText
              control={form.control}
              name="identity_number"
              label="Nomor Induk Kependudukan"
              placeholder="Masukan NIK pada KTP/KK"
            />
            <InputText
              control={form.control}
              name="fullname"
              label="Nama Lengkap"
              placeholder="Masukan Nama Lengkap"
            />
          </div>
          <div className="flex gap-x-4">
            <InputText
              control={form.control}
              type="date"
              name="birthdate"
              label="Tanggal Lahir"
              placeholder="Masukan Tanggal Lahir"
            />
            <Select
              name="gender"
              control={form.control}
              label="Jenis Kelamin"
              placeholder="Pilih Jenis Kelamin"
              options={genderOption}
            />
          </div>
          <div className="flex gap-x-4">
            <InputText
              control={form.control}
              name="religion"
              label="Agama"
              placeholder="Masukan Agama pada KTP"
            />
            <InputText
              control={form.control}
              name="address"
              label="Alamat"
              placeholder="Masukan Alamat Lengkap"
            />
          </div>
          <InputText
            control={form.control}
            name="school"
            label="Pendidikan Terahir"
            placeholder="Masukan Nama Sekolah"
          />
          <InputText
            control={form.control}
            name="experience"
            label="Pengalaman"
            placeholder="Masukan Pengalaman"
          />
          <Select
            name="student_type"
            control={form.control}
            label="Kategori"
            placeholder="Pilih Kategori"
            options={studentTypeOptions}
          />
          <Button className="w-fit" onClick={handler.onSubmit} type="button" disabled={isPending}>
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};
