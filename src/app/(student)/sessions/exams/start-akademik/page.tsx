import { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useExam } from "./_hooks/use-exam";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { useDidEffect } from "@/app/_hooks/use-did-effect";
import { ExamStartPrompt } from "./_components/exam-start-prompt";
import { ExamLoading } from "./_components/exam-loading";
import { ExamError } from "./_components/exam-error";
import { ExamQuestion } from "./_components/exam-question";
import { ExamNavigation } from "./_components/exam-navigation";
import { ExamStatus } from "./_components/exam-status";
import { useExamTimer } from "./_hooks/use-exam-timer";
import { useGetSessionTest } from "../../_hooks/use-get-session-test";
import { TExamAnswerRequest } from "@/api/answer/type";
import { UserLocalStorage } from "@/libs/cookies";

export const Component: FC = (): ReactElement => {
  const params = useParams<{ examId: string; sessionId: string }>();
  const answerExamMutation = useAnswerExamMutation();

  const {
    data: sessionData,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
    refetch: refetchSession,
  } = useGetSessionTest(params.sessionId!);

  const test = sessionData?.data?.tests.find(({ test }) => test?.id?.includes(params.examId!));

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuestion = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [answers, setAnswers] = useState<TExamAnswerRequest["answers"]>([]);
  const answersRef = useRef<TExamAnswerRequest["answers"]>([]);

  const handleExitFullscreen = useCallback(async () => {
    const userData = UserLocalStorage.get();
    try {
      const res = await answerExamMutation.mutateAsync({
        test_id: params.examId!,
        user_id: userData?.id,
        session_id: params.sessionId!,
        answers: answersRef.current.filter((answer) => answer !== null),
      });
      toast.success("Ujian telah selesai. Jawaban Anda telah disimpan.");
      navigate(`/student/sessions/${params.sessionId}/exams/result?answerIds=${res.data.id}`, {
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
  }, [params, answerExamMutation, navigate]);

  const handleFallback = useCallback(() => {
    navigate(`/student/sessions/${params.sessionId}/exams`, {
      replace: true,
    });
  }, [params, navigate]);

  // Define useExam first to ensure finishExam is available
  const { startExam, finishExam } = useExam({
    onExitFullscreen: handleExitFullscreen,
    onFallback: handleFallback,
  });

  const { timeUntilStart, timeLeft, formatTime } = useExamTimer(
    test?.start_date,
    test?.end_date,
    params.sessionId!,
  );

  const [start, setStart] = useState(false);

  useEffect(() => {
    const questionCount = test?.test?.questions?.length || 0;
    if (questionCount !== answers.length) {
      setAnswers(Array(questionCount).fill(null));
    }
  }, [test?.test?.questions?.length]);

  useDidEffect(() => {
    const allow = timeLeft === 0 && timeUntilStart === 0 && !isSessionLoading && start;
    if (allow) {
      finishExam();
    }
  }, [timeLeft === 0 && timeUntilStart === 0 && !isSessionLoading && start]);

  const nextQuestion = () => {
    if (!test) return;
    if (currentQuestion < (test?.test?.questions?.length || 0) - 1) {
      navigate(
        `/student/sessions/${params.sessionId}/exams/test-akademik/${params.examId}?page=${currentQuestion + 2}`,
      );
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      navigate(
        `/student/sessions/${params.sessionId}/exams/test-akademik/${params.examId}?page=${currentQuestion}`,
      );
    }
  };

  const goToQuestion = (index: number) => {
    navigate(
      `/student/sessions/${params.sessionId}/exams/test-akademik/${params.examId}?page=${index + 1}`,
    );
  };

  const handleAnswer = (answer: TExamAnswerRequest["answers"][number]) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = answer;
      answersRef.current = updatedAnswers;
      return updatedAnswers;
    });
  };

  const isSubmitting = answerExamMutation.isPending;
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const unansweredCount = (test?.test?.questions?.length || 0) - answeredCount;

  if (!start || timeUntilStart > 0) {
    return (
      <ExamStartPrompt
        onStart={() => {
          startExam();
          setStart(true);
        }}
        isPending={isSessionLoading}
        timeUntilStart={timeUntilStart}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />
    );
  }

  if (isSessionLoading) {
    return <ExamLoading />;
  }

  if (isSessionError) {
    return <ExamError error={sessionError} onRetry={() => refetchSession()} />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <ExamStatus
        testName={test?.test?.name}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        timeLeft={timeLeft}
        timeUntilStart={timeUntilStart}
        isLoading={isSessionLoading}
        formatTime={formatTime}
      />
      <section className="flex flex-1 w-full max-w-7xl">
        <ExamNavigation
          questions={test?.test?.questions || []}
          currentQuestion={currentQuestion}
          answers={answers}
          onGoToQuestion={goToQuestion}
          onFinish={finishExam}
          isSubmitting={isSubmitting}
        />
        <ExamQuestion
          question={test?.test?.questions?.[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={test?.test?.questions?.length || 0}
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
