import { FC, ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Component: FC = (): ReactElement => {
  const questions = [
    "Apa yang Anda rasakan saat bangun pagi?",
    "Apakah Anda merasa cemas secara berlebihan?",
    "Seberapa sering Anda merasa lelah tanpa alasan?",
    "Apakah Anda mengalami kesulitan tidur?",
    "Apakah Anda merasa bahagia dengan diri sendiri?",
    "Seberapa sering Anda merasa kesepian?",
    "Apakah Anda merasa mudah marah atau frustrasi?",
    "Apakah Anda sering khawatir tentang masa depan?",
    "Seberapa sering Anda merasa tidak termotivasi?",
    "Apakah Anda merasa puas dengan hubungan sosial Anda?",
  ];

  const options = ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuestion = parseInt(searchParams.get("page") || "1", 10) - 1;

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      navigate(`/exams/${currentQuestion + 2}?page=${currentQuestion + 2}`);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      navigate(`/exams/${currentQuestion}?page=${currentQuestion}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="col-span-2 w-full p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Test Kesehatan Mental</h2>
          <div className="flex flex-1 w-full max-w-7xl bg-white shadow rounded-lg p-6 flex-col gap-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Soal Nomor {currentQuestion + 1}: {questions[currentQuestion]}
            </h3>
            <div className="flex flex-col gap-2">
              {options.map((option, optIndex) => (
                <label key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Kembali
              </button>
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {currentQuestion === questions.length - 1 ? "Selesai" : "Lanjut"}
              </button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};
