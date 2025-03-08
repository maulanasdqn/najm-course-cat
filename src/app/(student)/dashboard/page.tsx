import { FC, ReactElement } from "react";
import { UserLocalStorage } from "@/libs/cookies";

export const Component: FC = (): ReactElement => {
  const userData = UserLocalStorage.get();
  const needsEmailVerification = !userData?.is_active;
  console.log(userData);
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {needsEmailVerification && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="mb-2">
            Please check your email to verify your account. If you didn't receive the email, you can
            request a new verification link.
          </p>
          <a href="/auth/verify-email" className="text-blue-600 hover:text-blue-800 underline">
            Go to Email Verification Page
          </a>
        </div>
      )}
      {/* Main Content */}
      <main className="flex flex-col w-full mx-auto px-4 py-6 gap-y-6">
        {/* Card Progress */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Progress Anda</h2>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full text-sm text-white text-center"
              style={{ width: "50%" }} // Progress bar width
            >
              50%
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Anda telah menyelesaikan 50% materi try out. Selesaikan materi berikutnya untuk hasil
            terbaik!
          </p>
        </div>

        {/* Informasi Try Out */}
        <div className="bg-white shadow rounded-lg p-6 col-span-3">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Informasi Penting</h2>
          <ul className="space-y-4">
            <li className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-lg font-bold text-gray-700">Tanggal Try Out</h3>
              <p className="text-gray-600">
                Try out akan dilaksanakan pada <strong>10 Februari 2025</strong>.
              </p>
            </li>
            <li className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-lg font-bold text-gray-700">Durasi Tes</h3>
              <p className="text-gray-600">
                Durasi tes adalah <strong>120 menit</strong>. Pastikan Anda siap sebelum memulai.
              </p>
            </li>
            <li className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-lg font-bold text-gray-700">Materi Try Out</h3>
              <p className="text-gray-600">
                Tes mencakup penalaran, verbal, numerik, dan kepribadian.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Component;
