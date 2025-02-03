import { InputText } from "@/app/_components/ui/inputs/text";
import { useResetPassword } from "./_hooks/use-reset-password";
import { Button } from "@/app/_components/ui/button";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const { form, handler } = useResetPassword();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate(ROUTES.AUTH.LOGIN.URL);
    } else form.setValue("token", token);
  }, []);

  return (
    <section className="flex h-screen">
      {/* Form Section */}
      <div className="flex flex-col lg:w-1/2 w-full items-center justify-center gap-2 lg:p-16 p-8 bg-white">
        <img src="/logo.png" alt="Logo" className="w-32 " />
        <h1 className="text-3xl text-center font-bold text-blue-700">Setel Ulang Password</h1>
        <form onSubmit={handler.onSubmit} className="w-full flex flex-col mt-6 gap-y-6">
          <InputText
            type="password"
            label="Password"
            control={form.control}
            name="password"
            placeholder="Password"
          />
          <InputText
            type="password"
            label="Confirm Password"
            control={form.control}
            name="confirm_password"
            placeholder="Confirm Password"
          />
          <Button
            size="lg"
            disabled={!form.formState.isValid}
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white"
          >
            Kirim
          </Button>
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
