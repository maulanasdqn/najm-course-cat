import { FC, ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useExam } from "../detail/_hooks/use-exam";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { ArrowRightIcon } from "@/app/_components/ui/icons/ic-arrow-right";
import { TExamAnswerRequest } from "@/api/test/type";
import { useTimer } from "../_hooks/use-timer";

// Left arrow icon component
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.25 12H3.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 5.25L3.75 12L10.5 18.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Component: FC = (): ReactElement => {
  const params = useParams<{ examId: string; sessionId: string }>();
  const answerExamMutation = useAnswerExamMutation();
  const testQuery = {
    data: {
      status_code: 200,
      version: "1.0",
      data: {
        id: "test-123",
        test_name: "Test Kesehatan Mental Dummy",
        session_id: "session-456",
        start_date: "2024-01-01T09:00:00Z",
        end_date: "2024-01-01T12:00:00Z",
        created_at: "2023-12-01T00:00:00Z",
        updated_at: "2023-12-01T00:00:00Z",
        questions: [
          {
            id: "question-1",
            question: "Bagaimana perasaan Anda akhir-akhir ini?",
            discussion: "Pertanyaan ini mengukur kondisi emosional Anda",
            options: [
              {
                id: "option-1",
                label: "Sangat baik",
                is_correct: true,
              },
              {
                id: "option-2",
                label: "Baik",
                is_correct: false,
              },
              {
                id: "option-3",
                label: "Biasa saja",
                is_correct: false,
              },
              {
                id: "option-4",
                label: "Tidak baik",
                is_correct: false,
              },
            ],
          },
          {
            id: "question-2",
            question: "Seberapa sering Anda merasa cemas?",
            discussion: "Pertanyaan ini mengukur tingkat kecemasan Anda",
            options: [
              {
                id: "option-5",
                label: "Tidak pernah",
                is_correct: true,
              },
              {
                id: "option-6",
                label: "Jarang",
                is_correct: false,
              },
              {
                id: "option-7",
                label: "Kadang-kadang",
                is_correct: false,
              },
              {
                id: "option-8",
                label: "Sering",
                is_correct: false,
              },
            ],
          },
        ],
      },
    },
    isLoading: false,
    isError: false,
    error: null,
  };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuestion = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [answers, setAnswers] = useState<TExamAnswerRequest["questions"]>([]);

  useEffect(() => {
    if (testQuery.data?.data.end_date) {
      const endDate = new Date(testQuery.data.data.end_date).getTime();
      const now = new Date().getTime();

      // If end_date is in the past, redirect to exam list
      if (endDate - now <= 0) {
        navigate(`/student/sessions/${params.sessionId}/exams`, { replace: true });
        toast.error("Waktu ujian telah berakhir.");
      }
    }
  }, [testQuery.data?.data.end_date, navigate, params.sessionId]);

  const { finishExam } = useExam({
    onFinish: () => {
      answerExamMutation.mutate(
        {
          test_id: params.examId!,
          questions: answers.filter((answer) => answer !== null),
        },
        {
          onSuccess: () => {
            navigate(`/student/sessions/${params.sessionId}/exams/${params.examId}/result`, {
              replace: true,
            });
            toast.success("Ujian telah selesai. Jawaban Anda telah disimpan.");
          },
          onError: () => {
            toast.error("Terjadi kesalahan saat menjawab ujian.");
          },
        },
      );
    },
  });

  useEffect(() => {
    setAnswers(Array(testQuery.data?.data.questions.length).fill(null));
  }, [testQuery.data?.data.questions]);

  const { timeUntilStart, timeLeft } = useTimer(
    testQuery.data?.data.start_date,
    testQuery.data?.data.end_date,
    params.sessionId!,
  );

  // Handle exam timeout
  useEffect(() => {
    if (timeLeft <= 0 && testQuery.data?.data.end_date && !testQuery.isLoading) {
      finishExam();
    }
  }, [timeLeft, finishExam, testQuery.data?.data.end_date, testQuery.isLoading]);

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

  // Show loading state while fetching exam data
  if (testQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Memuat Ujian...</h2>
        </div>
      </div>
    );
  }

  // Show error state if exam data fails to load
  if (testQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gagal Memuat Ujian</h2>
          <p className="text-gray-600 mb-6">Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  // Show countdown if exam hasn't started yet
  if (timeUntilStart > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ujian Belum Dimulai</h2>
          <p className="text-gray-600 mb-6">Ujian akan dimulai dalam:</p>
          <div className="text-4xl font-bold text-blue-600">{formatTime(timeUntilStart)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      {/* Status section moved to top */}
      <div className="w-full max-w-7xl bg-white mt-6 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h2 className="text-xl font-bold text-gray-700">Test Kesehatan Mental</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                <p className="text-gray-800">Terisi: {answeredCount}</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                <p className="text-gray-800">Belum Terisi: {unansweredCount}</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-red-600">
            {testQuery.isLoading
              ? "Memuat waktu..."
              : timeUntilStart > 0
                ? `Ujian dimulai dalam: ${formatTime(timeUntilStart)}`
                : `Waktu Tersisa: ${formatTime(timeLeft)}`}
          </div>
        </div>
      </div>

      {timeUntilStart > 0 ? null : (
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
                      : answers[index]?.question_id && currentQuestion !== index
                        ? "bg-green-500 text-white"
                        : "bg-red-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={finishExam}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Selesaikan Ujian
            </button>
          </aside>
          <main className="flex-1 order-1 p-6 pl-0">
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
                          question_id: testQuery.data?.data.questions[currentQuestion].id,
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
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 flex items-center"
                >
                  <span className="mr-2">
                    <ArrowLeftIcon />
                  </span>
                  Kembali
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === (testQuery.data?.data.questions.length || 1) - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 flex items-center"
                >
                  Simpan dan Lanjutkan
                  <span className="ml-2">
                    <ArrowRightIcon />
                  </span>
                </button>
              </div>
            </div>
          </main>
        </section>
      )}
    </div>
  );
};
