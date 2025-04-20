import { FC, ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSessionTest } from "../_hooks/use-get-session-test";

export const Component: FC = (): ReactElement => {
  const params = useParams<{ sessionId: string }>();
  const { data, isLoading } = useGetSessionTest(params.sessionId!);

  if (isLoading) {
    return (
      <div className="w-full text-center p-6 text-gray-600 animate-pulse">
        Memuat daftar ujian...
      </div>
    );
  }

  if (!data?.data?.tests?.length) {
    return (
      <div className="w-full text-center p-6 text-gray-600 border rounded-lg bg-white">
        Tidak ada ujian tersedia dalam sesi ini
      </div>
    );
  }

  const isPsikologSession = data.data.student_type === "psikolog";
  const isKecermatanSession = data.data.student_type === "kecermatan";

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          {/* Session type label */}
          <div className="mb-4">
            <span className={`px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800`}>
              {data.data.student_type.charAt(0).toUpperCase() + data.data.student_type.slice(1)}
            </span>
          </div>

          {/* Session title */}
          <h2 className="text-xl font-bold mb-4">{data.data.session_name}</h2>

          {isPsikologSession && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.data.tests.map((test) => (
                <div
                  key={test.id}
                  className="border bg-white rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-800">{test.test_name}</h3>
                  <Link
                    to={`/student/sessions/${params.sessionId}/exams/test-psikolog/${test.id}`}
                    className="text-sm text-blue-600 font-bold hover:underline"
                  >
                    Kerjakan Tes →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {isKecermatanSession && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.data.tests.map((test) => (
                <div
                  key={test.id}
                  className="border bg-white rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-800">{test.test_name}</h3>
                  <Link
                    to={`/student/sessions/${params.sessionId}/exams/test-kecermatan/${test.id}`}
                    className="text-sm text-blue-600 font-bold hover:underline"
                  >
                    Kerjakan Tes →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!isPsikologSession && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.data.tests.map((test) => (
                <div
                  key={test.id}
                  className="border bg-white rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-800">{test.test_name}</h3>
                  <Link
                    to={`/student/sessions/${params.sessionId}/exams/test-akademik/${test.id}`}
                    className="text-sm text-blue-600 font-bold hover:underline"
                  >
                    Kerjakan Tes →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default Component;
