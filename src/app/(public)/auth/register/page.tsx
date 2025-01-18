import { FC, ReactElement } from "react";
import { useRegister } from "./hooks/use-register";
import { InputText } from "@/app/_components/ui/inputs/text";
import { InputTag } from "@/app/_components/ui/inputs/tag";
import { InputCheckbox } from "@/app/_components/ui/inputs/checkbox";
import { GoogleButton } from "@/app/_components/ui/button/google-button";

export const Component: FC = (): ReactElement => {
  const { form, handler } = useRegister();

  const checkboxLabel = (
    <span className="text-sm text-gray-500">
      Setujui <strong className="text-blue-800 font-bold">Syarat dan Ketentuan</strong>
    </span>
  );

  return (
    <section className="flex lg:h-screen h-full">
      {/* Form Section */}
      <div className="flex flex-col lg:w-1/2 w-full h-full justify-center items-center rounded-md shadow-lg p-8 bg-white">
        <img src="/logo.png" alt="Logo" className="w-32" />
        <h1 className="text-2xl text-center font-bold text-blue-700">Daftar Akun</h1>
        <p className="text-center text-xs">
          Jika kamu sudah memiliki akun,{" "}
          <a className="text-blue-600 font-bold hover:underline" href="/auth/login">
            Masuk
          </a>{" "}
          atau kembali ke{" "}
          <a className="text-blue-600 font-bold hover:underline" href="https://najmcourse.com/">
            Beranda
          </a>
        </p>
        <form
          onSubmit={handler.onSubmit}
          className="w-full flex flex-col mt-4 gap-y-2 lg:px-12 px-0"
        >
          <div className="flex w-full gap-x-4">
            <InputText
              label="Nama"
              control={form.control}
              name="firstName"
              placeholder="Masukan Nama Lengkap"
            />
          </div>
          <InputText
            type="email"
            label="Email"
            control={form.control}
            name="email"
            placeholder="Masukan Email Aktif"
          />
          <InputText
            type="number"
            label="Nomor Telp."
            control={form.control}
            name="phoneNumber"
            placeholder="08xxxxxxxxxx"
          />
          <div className="flex w-full gap-x-4">
            <InputText
              type="password"
              label="Password"
              control={form.control}
              name="password"
              placeholder="**********"
            />
            <InputText
              type="password"
              label="Masukan Ulang Password"
              control={form.control}
              name="confirmPassword"
              placeholder="**********"
            />
          </div>
          <InputTag label="Rekomendasi" name="interests" control={form.control} />
          <InputText
            label="Kode Referal"
            control={form.control}
            name="interests"
            placeholder="Masukan Kode Referal"
          />
          <div className="flex w-full justify-between gap-x-4 items-center">
            <InputCheckbox label={checkboxLabel} name="terms" control={form.control} />
            <button
              className="w-auto text-sm flex bg-blue-900 text-white px-6 py-2 rounded-full font-medium items-center justify-center hover:bg-blue-800"
              disabled={!form.formState.isValid}
              type="submit"
            >
              <div className="flex items-center gap-x-2">Daftar</div>
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">Atau Daftar Dengan</p>
          <div className="flex w-full items-center justify-center gap-4">
            <GoogleButton onClick={() => console.log("wauh")} />
          </div>
        </form>
      </div>

      {/* Banner Section */}
      <div className="hidden lg:flex w-1/2 h-full bg-[url('/background-image.jpg')] bg-no-repeat bg-cover bg-center relative items-center justify-center">
        <div className="absolute inset-0 bg-blue-500 bg-opacity-70"></div>
        <div className="z-10 text-center text-white">
          <h2 className="text-4xl font-bold">
            <span className="text-yellow-400">NAJM</span> COURSE
          </h2>
          <p className="text-sm mt-2">Taruna Learning Center</p>
        </div>
      </div>
    </section>
  );
};
