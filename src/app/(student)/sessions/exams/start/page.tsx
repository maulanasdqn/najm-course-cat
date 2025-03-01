import { FC, ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TExamAnswerRequest } from "@/api/exams/type";
import { useExam } from "../detail/_hooks/use-exam";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { useGetTest } from "./_hooks/use-get-tests-query";

export const Component: FC = (): ReactElement => {
  const params = useParams<{ examId: string; sessionId: string }>();
  const answerExamMutation = useAnswerExamMutation();
  const testQuery = useGetTest(params.examId!);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuestion = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [answers, setAnswers] = useState<TExamAnswerRequest["questions"]>([]);

  const { finishExam } = useExam({
    onFinish: () => {
      answerExamMutation.mutate(
        {
          id: params.examId!,
          questions: answers.filter((answer) => answer !== null),
        },
        {
          onSuccess: () => {
            navigate(`/student/sessions/${params.sessionId}/exams/${params.examId}/result`, {
              replace: true,
            });
            toast.success("Ujian telah selesai. Jawaban Anda telah disimpan.");
          },
        },
      );
    },
  });

  useEffect(() => {
    setAnswers(Array(testQuery.data?.data.questions.length).fill(null));
  }, [testQuery.data?.data.questions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextQuestion = () => {
    if (!testQuery.data) return;
    if (currentQuestion < testQuery.data.data.questions.length - 1) {
      navigate(
        `/student/sessions/${params.sessionId}/exams/${params.examId}/start?page=${currentQuestion + 2}`,
      );
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      navigate(
        `/student/sessions/${params.sessionId}/exams/${params.examId}/start?page=${currentQuestion}`,
      );
    }
  };

  const goToQuestion = (index: number) => {
    navigate(
      `/student/sessions/${params.sessionId}/exams/${params.examId}/start?page=${index + 1}`,
    );
  };

  const handleAnswer = (answer: TExamAnswerRequest["questions"][number]) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const unansweredCount = (testQuery.data?.data.questions.length || 0) - answeredCount;

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <section className="flex flex-1 w-full max-w-7xl">
        <aside className="w-1/4 order-2 bg-white mt-6 p-4 rounded-lg shadow-md h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h3>
          <div className="grid grid-cols-5 gap-2">
            {testQuery.data?.data.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-md ${
                  currentQuestion === index
                    ? "bg-blue-500 text-white"
                    : answers[index]?.id && currentQuestion !== index
                      ? "bg-green-500 text-white"
                      : "bg-red-500"
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
              Soal Nomor {currentQuestion + 1} dari {testQuery.data?.data.questions.length} :
            </h3>
            <h2 className="text-lg font-semibold  mb-4">
              {testQuery.data?.data.questions[currentQuestion].question}
            </h2>
            <div className="flex flex-col gap-2">
              {testQuery.data?.data.questions[currentQuestion].options.map((option, optIndex) => (
                <label key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option.id}
                    onChange={() =>
                      handleAnswer({
                        id: testQuery.data?.data.questions[currentQuestion].id,
                        option_id: option.id,
                      })
                    }
                    checked={answers[currentQuestion]?.option_id === option.id}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700">{option.label}</span>
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
                disabled={currentQuestion === (testQuery.data?.data.questions.length || 1) - 1}
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
