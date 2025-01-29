import { FC, ReactElement, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import questions from "./questions.json";

export const Component: FC = (): ReactElement => {
  const options = ["Sangat Setuju", "Setuju", "Rata-rata", "Tidak Setuju", "Sangat Tidak Setuju"];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuestion = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      navigate(`/student/exams/${currentQuestion + 2}?page=${currentQuestion + 2}`);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      navigate(`/student/exams/${currentQuestion}?page=${currentQuestion}`);
    }
  };

  const goToQuestion = (index: number) => {
    navigate(`/student/exams/${index + 1}?page=${index + 1}`);
  };

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
  };

  const finishExam = () => {
    alert("Ujian telah selesai. Jawaban Anda telah disimpan.");
    navigate("/student/exams/summary");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <aside className="w-1/4 order-2 bg-white mt-6 p-4 rounded-lg shadow-md h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-md ${
                  currentQuestion === index ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-gray-800">
            <p>Terisi: {answeredCount}</p>
            <p>Belum Terisi: {unansweredCount}</p>
          </div>
          <button
            onClick={finishExam}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Selesaikan Ujian
          </button>
        </aside>
        <main className="flex-1 order-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">Test Kesehatan Mental</h2>
            <div className="text-lg font-semibold text-red-600">
              Waktu Tersisa: {formatTime(timeLeft)}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg text-gray-800 mb-2">
              Soal Nomor {currentQuestion + 1} dari {questions.length} :
            </h3>
            <h2 className="text-lg font-semibold  mb-4">{questions[currentQuestion]}</h2>
            <div className="flex flex-col gap-2">
              {options.map((option, optIndex) => (
                <label key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    onChange={() => handleAnswer(option)}
                    checked={answers[currentQuestion] === option}
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
                disabled={currentQuestion === questions.length - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Lanjut
              </button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};
