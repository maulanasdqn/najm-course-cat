import { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useExam } from "../start/_hooks/use-exam";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { TExamAnswerRequest } from "@/api/test/type";
import { useTimer } from "../_hooks/use-timer";
import { useGetTest } from "./_hooks/use-get-tests-query";
import { useDidEffect } from "@/app/_hooks/use-did-effect";
import { ExamStartPrompt } from "./_components/exam-start-prompt";
import { ExamLoading } from "./_components/exam-loading";
import { ExamError } from "./_components/exam-error";
import { ExamCountdown } from "./_components/exam-countdown";
import { ExamQuestion } from "./_components/exam-question";
import { ExamNavigation } from "./_components/exam-navigation";
import { ExamStatus } from "./_components/exam-status";

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

  if (!start) {
    return <ExamStartPrompt onStart={() => setStart(true)} isPending={testQuery.isPending} />;
  }

  if (testQuery.isLoading) {
    return <ExamLoading />;
  }

  if (testQuery.isError) {
    return <ExamError error={testQuery.error} onRetry={() => testQuery.refetch()} />;
  }

  if (timeUntilStart > 0) {
    return (
      <ExamCountdown
        timeUntilStart={timeUntilStart}
        testName={testQuery.data?.data.test_name}
        onStart={startExam}
        formatTime={formatTime}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <ExamStatus
        testName={testQuery.data?.data.test_name}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        timeLeft={timeLeft}
        timeUntilStart={timeUntilStart}
        isLoading={testQuery.isLoading}
        formatTime={formatTime}
      />
      <section className="flex flex-1 w-full max-w-7xl">
        <ExamNavigation
          questions={testQuery.data?.data.questions || []}
          currentQuestion={currentQuestion}
          answers={answers}
          onGoToQuestion={goToQuestion}
          onFinish={finishExam}
          isSubmitting={isSubmitting}
        />
        <ExamQuestion
          question={testQuery.data?.data.questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={testQuery.data?.data.questions.length || 0}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestion]}
          onPrev={prevQuestion}
          onNext={nextQuestion}
          isSubmitting={isSubmitting}
        />
      </section>
    </div>
  );
};