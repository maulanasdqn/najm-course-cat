import { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useTimer } from "@/app/_hooks/use-timer";
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
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const currentQuestionRef = useRef<number>(0);
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

  const timer = useTimer(60, {
    onComplete: ({ reset, start }) => {
      const totalQuestions = test?.test?.questions?.length ?? 1;
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((prev) => prev + 1);
        reset();
        start();
      } else {
        finishExam();
      }
    },
  });

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
      setCurrentQuestion(currentQuestion + 1);
      currentQuestionRef.current = currentQuestion + 1;
    }
    timer.reset();
    timer.start();
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      currentQuestionRef.current = currentQuestion - 1;
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    currentQuestionRef.current = index;
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
          timer.start();
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
        timeLeft={timer.remainingTime}
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
