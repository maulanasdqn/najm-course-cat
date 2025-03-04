import { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useGetTests } from "./_hooks/use-get-tests";

const exams = [
  {
    created_at: "2025-03-01 16:02:20.267238 UTC",
    id: "1",
    question_count: 1,
    test_name: "Kepribadian",
    updated_at: "2025-03-02 02:16:12.546876 UTC",
  },
  {
    created_at: "2025-03-01 16:02:20.267238 UTC",
    id: "2",
    question_count: 1,
    test_name: "Kognitif",
    updated_at: "2025-03-02 02:16:12.546876 UTC",
  },
];

export const Component: FC = (): ReactElement => {
  const params = useParams<{ sessionId: string }>();
  const { data } = useGetTests({
    session_id: params.sessionId,
  });
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exams.map((test) => (
              <div
                key={test.id}
                className="border bg-white rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{test.test_name}</h3>
                <p className="text-sm text-gray-600 mb-2">Status:</p>
                <a
                  href={`/student/sessions/${params.sessionId}/exams/${test.id}/detail`}
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  Kerjakan Tes →
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
