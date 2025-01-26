import { FC, ReactElement, useEffect } from "react";
import { useLogin } from "./_hooks/use-login";
import { GoogleButton } from "@/app/_components/ui/button/google-button";
import { InputText } from "@/app/_components/ui/inputs/text";
import { Button } from "@/app/_components/ui/button";
import { InputCheckbox } from "@/app/_components/ui/inputs/checkbox";
import { queryClient } from "@/libs/react-query/react-query-client";
import { POST_LOGIN_MUTATION_KEY } from "./_hooks/use-post-login";

export const Component: FC = (): ReactElement => {
  const { form, handler } = useLogin();
  const checkboxLabel = <span className="text-gray-500">Ingat Saya</span>;

  useEffect(() => {
    queryClient
      .getMutationCache()
      .find({
        mutationKey: POST_LOGIN_MUTATION_KEY,
      })
      ?.destroy();
  }, []);

  return (
    <section className="flex h-screen">
      {/* Form Section */}
      <div className="flex flex-col lg:w-1/2 w-full items-center justify-center gap-2 lg:p-16 p-8 bg-white">
        <img src="/logo.png" alt="Logo" className="w-32 " />
        <h1 className="text-3xl text-center font-bold text-blue-700">Masuk</h1>
        <p className="text-center text-xs">
          Jika kamu belum memiliki akun, silahkan{" "}
          <a className="text-blue-600 font-bold px-1" href={"/auth/register"}>
            Daftar
          </a>
          terlebih dahulu atau kembali ke{" "}
          <a className="text-blue-600 font-bold" href={"https://www.najmcourse.com/"}>
            Beranda
          </a>
        </p>
        <form onSubmit={handler.onSubmit} className="w-full flex flex-col mt-6 gap-y-6">
          <InputText
            type="email"
            label="Email"
            control={form.control}
            name="email"
            placeholder="Email"
          />
          <InputText
            type="password"
            label="Password"
            control={form.control}
            name="password"
            placeholder="**********"
          />
          <div className="flex w-full justify-between items-center">
            <InputCheckbox label={checkboxLabel} name={"remember"} control={form.control} />
            <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Lupa Kata Sandi?
            </a>
          </div>
          <Button
            size="lg"
            disabled={!form.formState.isValid}
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white"
          >
            Masuk
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">Atau Login Dengan</p>
        <div className="flex gap-4 mt-2">
          <GoogleButton onClick={() => console.log("wauh")} />
        </div>
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
