import { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useExam } from "../start/_hooks/use-exam";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { ArrowRightIcon } from "@/app/_components/ui/icons/ic-arrow-right";
import { TExamAnswerRequest } from "@/api/test/type";
import { useTimer } from "../_hooks/use-timer";
import { useGetTest } from "./_hooks/use-get-tests-query";
import { useDidEffect } from "@/app/_hooks/use-did-effect";

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
  const testQuery = useGetTest(params.examId!);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuestion = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [answers, setAnswers] = useState<TExamAnswerRequest["questions"]>([]);
  const answersRef = useRef<TExamAnswerRequest["questions"]>([]);

  const handleExitFullscreen = useCallback(async () => {
    try {
      const res = await answerExamMutation.mutateAsync({
        test_id: params.examId!,
        questions: answersRef.current.filter((answer) => answer !== null),
      });
      toast.success("Ujian telah selesai. Jawaban Anda telah disimpan.");
      navigate(`/student/sessions/${params.sessionId}/result/${res.data.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menjawab ujian.");
      navigate(`/student/sessions/${params.sessionId}/exams`, {
        replace: true,
      });
    } finally {
      finishExam();
    }
  }, [answers]);

  const handleFallback = useCallback(() => {
    navigate(`/student/sessions/${params.sessionId}/exams`, {
      replace: true,
    });
  }, [answers]);

  const { startExam, finishExam } = useExam({
    onExitFullscreen: handleExitFullscreen,
    onFallback: handleFallback,
  });

  const { timeUntilStart, timeLeft, clearTimer } = useTimer(
    typeof testQuery.data?.data.start_date === "undefined"
      ? undefined
      : testQuery.data.data.start_date,
    typeof testQuery.data?.data.end_date === "undefined"
      ? undefined
      : testQuery.data?.data.end_date,
    params.sessionId!,
  );

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!testQuery.data) return;
    const dateStart = Math.floor(new Date(testQuery.data.data.start_date).getTime() / 1000);
    const dateNow = Math.floor(new Date().getTime() / 1000);
    if (dateStart <= dateNow && start && timeUntilStart <= 0) {
      startExam();
    }
  }, [testQuery.data?.data.start_date, start, timeUntilStart <= 0]);

  useEffect(() => {
    const questionCount = testQuery.data?.data.questions?.length || 0;
    if (questionCount !== answers.length) {
      setAnswers(Array(questionCount).fill(null));
    }
  }, [testQuery.data?.data.questions?.length, answers.length]);

  // Handle exam timeout
  useDidEffect(() => {
    if (
      timeLeft === 0 &&
      timeUntilStart === 0 &&
      testQuery.data?.data.end_date &&
      !testQuery.isLoading &&
      (!answerExamMutation.isSuccess || !answerExamMutation.isError)
    ) {
      clearTimer();
      finishExam();
    }
  }, [timeLeft, testQuery.data?.data.end_date, testQuery.isLoading]);

  if (!start) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pemberitahuan</h2>
          <p className="text-gray-600 mb-6">
            Sebelum memulai ujian, pastikan Anda telah membaca petunjuk berikut:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Keluar dari fullscreen mode akan menyelesaikan ujian.
            </li>
            <li>Pastikan Anda memiliki koneksi internet yang stabil.</li>
            <li>Waktu ujian akan dimulai setelah Anda menekan tombol "Mulai Ujian".</li>
            <li>Setiap soal wajib dijawab sebelum menyelesaikan ujian.</li>
          </ul>
          <button
            onClick={() => {
              setStart(true);
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={testQuery.isPending}
          >
            {testQuery.isPending ? "Memuat..." : "Mulai Ujian"}
          </button>
        </div>
      </div>
    );
  }

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
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = answer;
      answersRef.current = updatedAnswers;
      return updatedAnswers;
    });
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isSubmitting = answerExamMutation.isPending;
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const unansweredCount = (testQuery.data?.data.questions.length || 0) - answeredCount;

  // Show loading state while fetching exam data
  if (testQuery.isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center self-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Memuat Ujian...</h2>
          <p className="text-gray-600">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // Show error state if exam data fails to load
  if (testQuery.isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center self-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gagal Memuat Ujian</h2>
          <p className="text-gray-600 mb-6">
            {testQuery.error instanceof Error
              ? testQuery.error.message
              : "Terjadi kesalahan saat memuat data ujian."}
          </p>
          <button
            onClick={() => testQuery.refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Show countdown if exam hasn't started yet
  if (timeUntilStart > 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center self-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ujian Belum Dimulai</h2>
          <p className="text-gray-600 mb-6">Ujian akan dimulai dalam:</p>
          {timeUntilStart > 0 ? (
            <div className="text-4xl font-bold text-blue-600">{formatTime(timeUntilStart)}</div>
          ) : (
            <button
              onClick={() => {
                startExam();
              }}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mulai Ujian
            </button>
          )}
          <div className="mt-6 text-sm text-gray-500">
            {testQuery.data?.data.test_name && (
              <p className="font-medium">Ujian: {testQuery.data.data.test_name}</p>
            )}
            <p>Halaman akan otomatis diperbarui saat ujian dimulai</p>
          </div>
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
            <h2 className="text-xl font-bold text-gray-700">{testQuery.data?.data.test_name}</h2>
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
              onClick={() => finishExam()}
              disabled={isSubmitting}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Mengirim...
                </span>
              ) : (
                "Selesaikan Ujian"
              )}
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
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Menyimpan...
                    </span>
                  ) : (
                    <>
                      Simpan dan Lanjutkan
                      <span className="ml-2">
                        <ArrowRightIcon />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>
        </section>
      )}
    </div>
  );
};
