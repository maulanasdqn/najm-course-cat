import { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";

const testList = [
  { id: 1, title: "Tes Kepribadian", status: "Belum Dikerjakan", score: null },
  { id: 2, title: "Tes Verbal", status: "Sudah Dikerjakan", score: 85 },
  { id: 3, title: "Tes Intelegensi", status: "Belum Dikerjakan", score: null },
  { id: 4, title: "Tes Penalaran", status: "Sudah Dikerjakan", score: 90 },
];

export const Component: FC = (): ReactElement => {
  const params = useParams<{ sessionId: string }>();
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Daftar Tes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testList.map((test) => (
              <div
                key={test.id}
                className="border bg-white rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{test.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Status: {test.status}</p>
                {test.score !== null ? (
                  <p className="text-sm text-green-600 font-bold">Skor: {test.score}</p>
                ) : (
                  <a
                    href={`/student/sessions/${params.sessionId}/exams/${test.id}/detail`}
                    className="text-sm text-blue-600 font-bold hover:underline"
                  >
                    Kerjakan Tes →
                  </a>
                )}
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
};

export default Component;
