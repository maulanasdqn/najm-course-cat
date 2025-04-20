import { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExam } from "./_hooks/use-exam";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { TExamAnswerRequest } from "@/api/test/type";
import { useGetTest } from "./_hooks/use-get-tests-query";
import { useDidEffect } from "@/app/_hooks/use-did-effect";
import { ExamStartPrompt } from "./_components/exam-start-prompt";
import { ExamLoading } from "./_components/exam-loading";
import { ExamError } from "./_components/exam-error";
import { ExamQuestion } from "./_components/exam-question";
import { ExamNavigation } from "./_components/exam-navigation";
import { ExamStatus } from "./_components/exam-status";
import { useExamTimer } from "./_hooks/use-exam-timer";
import { useTimer } from "@/app/_hooks/use-timer";

export const Component: FC = (): ReactElement => {
  const params = useParams<{ examId: string; sessionId: string }>();
  const answerExamMutation = useAnswerExamMutation();
  const testQuery = useGetTest(params.examId!);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const currentQuestionRef = useRef<number>(0);
  const [answers, setAnswers] = useState<TExamAnswerRequest["questions"]>([]);
  const answersRef = useRef<TExamAnswerRequest["questions"]>([]);

  const handleExitFullscreen = useCallback(async () => {
    try {
      const res = await answerExamMutation.mutateAsync({
        test_id: params.examId!,
        questions: answersRef.current.filter((answer) => answer !== null),
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
    testQuery.data?.data.start_date,
    testQuery.data?.data.end_date,
    params.sessionId!,
  );

  const timer = useTimer(60, {
    onComplete: ({ reset, start }) => {
      const totalQuestions = testQuery.data?.data.questions.length ?? 1;
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
    const questionCount = testQuery.data?.data.questions?.length || 0;
    if (questionCount !== answers.length) {
      setAnswers(Array(questionCount).fill(null));
    }
  }, [testQuery.data?.data.questions?.length]);

  useDidEffect(() => {
    const allow = timeLeft === 0 && timeUntilStart === 0 && !testQuery.isLoading && start;
    if (allow) {
      finishExam();
    }
  }, [timeLeft === 0 && timeUntilStart === 0 && !testQuery.isLoading && start]);

  const nextQuestion = () => {
    if (!testQuery.data) return;
    if (currentQuestion < testQuery.data.data.questions.length - 1) {
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

  const handleAnswer = (answer: TExamAnswerRequest["questions"][number]) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = answer;
      answersRef.current = updatedAnswers;
      return updatedAnswers;
    });
  };

  const isSubmitting = answerExamMutation.isPending;
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const unansweredCount = (testQuery.data?.data.questions.length || 0) - answeredCount;

  if (!start || timeUntilStart > 0) {
    return (
      <ExamStartPrompt
        onStart={() => {
          startExam();
          setStart(true);
          timer.start();
        }}
        isPending={testQuery.isPending}
        timeUntilStart={timeUntilStart}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />
    );
  }

  if (testQuery.isLoading) {
    return <ExamLoading />;
  }

  if (testQuery.isError) {
    return <ExamError error={testQuery.error} onRetry={() => testQuery.refetch()} />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <ExamStatus
        testName={testQuery.data?.data.test_name}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        timeLeft={timer.remainingTime}
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
