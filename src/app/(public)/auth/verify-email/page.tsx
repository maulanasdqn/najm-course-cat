import { Button } from "@/app/_components/ui/button";
import { OtpInput } from "@/app/_components/ui/inputs/otp-input";
import { useVerifyEmail } from "./_hooks/use-verify-email";
import { useEffect } from "react";
import { UserLocalStorage } from "@/libs/cookies";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { useCountdown } from "@/app/_hooks/use-countdown";

export const Component = () => {
  const { form, handler } = useVerifyEmail();
  const countdown = useCountdown(60 * 1000);
  const userData = UserLocalStorage.get();

  useEffect(() => {
    if (userData?.email) {
      form.setValue("email", userData.email);
    }
  }, [userData]);

  // Redirect to dashboard if already verified
  if (userData?.is_active) {
    return <Navigate to={ROUTES.STUDENT.DASHBOARD.URL} />;
  }

  // Redirect to login if no user data
  if (!userData) {
    return <Navigate to={ROUTES.AUTH.LOGIN.URL} />;
  }

  return (
    <section className="flex lg:h-screen h-full">
      {/* Form Section */}
      <div className="flex flex-col lg:w-1/2 w-full h-full justify-center items-center rounded-md shadow-lg p-8 bg-white">
        <img src="/logo.png" alt="Logo" className="w-32" />
        <form
          onSubmit={handler.onSubmit}
          className="w-full flex flex-col mt-4 gap-y-4 lg:px-12 px-0"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Verify Your Email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a verification code to your email. Please enter the code below.
            </p>
          </div>

          <OtpInput
            value={form.watch("otp")}
            onChange={(value) => form.setValue("otp", value!, { shouldValidate: true })}
            className="mb-4"
          />

          {countdown.times > 0 ? (
            <div className="flex justify-center items-center text-gray-600">
              Resend code in {countdown.minutes < 10 ? "0" + countdown.minutes : countdown.minutes}:
              {countdown.seconds < 10 ? "0" + countdown.seconds : countdown.seconds}
            </div>
          ) : (
            <Button
              size="lg"
              type="button"
              variant="secondary"
              className="w-full"
              onClick={async () => {
                await handler.onSendOtp({
                  onSuccess: () => {
                    countdown.retry();
                  },
                });
              }}
            >
              Resend Code
            </Button>
          )}

          <Button
            size="lg"
            disabled={!form.formState.isValid}
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white"
          >
            Verify Email
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
