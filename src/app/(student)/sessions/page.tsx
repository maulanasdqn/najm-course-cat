import { FC, ReactElement } from "react";
import { useGetSessionTests } from "@/app/(admin)/session-tests/_hooks/use-get-session-tests";

export const Component: FC = (): ReactElement => {
  const { data } = useGetSessionTests({});
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data?.data?.map((session) => (
              <div
                key={session.id}
                className="flex flex-col border bg-white rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{session.session_name}</h3>
                <p className="text-sm text-gray-600 mb-2 flex-1">{session.description}</p>
                <a
                  href={`/student/sessions/${session.id}/exams`}
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  Lihat sesi →
                </a>
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
};

export default Component;
