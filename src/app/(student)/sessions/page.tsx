import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useGetSessionTests } from "./_hooks/use-get-session-tests";

export const Component: FC = (): ReactElement => {
  const { data, isLoading } = useGetSessionTests({});

  if (isLoading) {
    return (
      <div className="w-full text-center p-6 text-gray-600 animate-pulse">Memuat sesi ujian...</div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="w-full text-center p-6 text-gray-600 border rounded-lg bg-white">
        Tidak ada sesi ujian tersedia
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.data.map((session) => (
              <div
                key={session.id}
                className="flex flex-col border bg-white rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{session.session_name}</h3>
                <p className="text-sm text-gray-600 mb-2 flex-1">{session.description}</p>
                <Link
                  to={`/student/sessions/${session.id}/exams`}
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  Lihat sesi →
                </Link>
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
};

export default Component;
