import { FC, ReactElement } from "react";

const sessionList = [
  {
    id: 1,
    title: "Persiapan pendaftaran TNI 2025",
    description: "Kumpulan test jitu untuk mempersiapkan pendaftaran TNI pada tahun 2025",
  },
  {
    id: 2,
    title: "Persiapan Sistem Operasi",
    description: "Kumpulan test jitu untuk mempersiapkan Sistem Operasi",
  },
];

export const Component: FC = (): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Daftar Sesi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sessionList.map((session) => (
              <div
                key={session.id}
                className="flex flex-col border bg-white rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{session.title}</h3>
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
