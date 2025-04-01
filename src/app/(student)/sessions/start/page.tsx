import { FC, ReactElement, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAnswerExamMutation } from "./_hooks/use-answer-exam-mutation";
import { TExamAnswerRequest } from "@/api/test/type";
import { useGetSessionTest } from "../_hooks/use-get-session-test";
import { useDidEffect } from "@/app/_hooks/use-did-effect";
import { ExamStartPrompt } from "./_components/exam-start-prompt";
import { ExamLoading } from "./_components/exam-loading";
import { ExamError } from "./_components/exam-error";
import { ExamQuestion } from "./_components/exam-question";
import { ExamNavigation } from "./_components/exam-navigation";
import { ExamStatus } from "./_components/exam-status";
import { useExamTimer } from "./_hooks/use-exam-timer";
import { useGetTest } from "./_hooks/use-get-tests-query";
import { useExam } from "./_hooks/use-exam";

export const Component: FC = (): ReactElement => {
  const params = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const answerExamMutation = useAnswerExamMutation();
  const sessionQuery = useGetSessionTest(params.sessionId!);
  const [currentTest, setCurrentTest] = useState<string>();
  const [searchParams] = useSearchParams();
  const currentQuestionIndex = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [answers, setAnswers] = useState<TExamAnswerRequest["questions"]>([]);
  const answersRef = useRef<TExamAnswerRequest["questions"]>([]);
  const answerIdsRef = useRef<string[]>([]);

  useEffect(() => {
    if (sessionQuery.data?.data.tests && sessionQuery.data.data.tests.length > 0) {
      const firstTest = sessionQuery.data.data.tests[0].id;
      setCurrentTest(firstTest);
    }
  }, [sessionQuery.data]);

  const handleExitFullscreen = useCallback(async () => {
    if (!sessionQuery.data) return;
    try {
      toast.success("Ujian telah selesai. Jawaban Anda telah disimpan.");
      navigate(
        `/student/sessions/${params.sessionId}/result?answerIds=${answerIdsRef.current.join(",")}`,
        {
          replace: true,
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menjawab ujian.");
      navigate(`/student/sessions/${params.sessionId}/exams`, {
        replace: true,
      });
    } finally {
      finishExam();
    }
  }, [params, answerExamMutation, navigate, currentTest, sessionQuery.data]);

  const handleFallback = useCallback(() => {
    navigate(`/student/sessions/${params.sessionId}/exams`, {
      replace: true,
    });
  }, [params, navigate]);

  const { startExam, finishExam } = useExam({
    onExitFullscreen: handleExitFullscreen,
    onFallback: handleFallback,
  });

  const testQuery = useGetTest(currentTest);
  const { timeUntilStart, timeLeft, formatTime } = useExamTimer(
    testQuery.data?.data.start_date,
    testQuery.data?.data.end_date,
    params.sessionId!,
  );

  const [start, setStart] = useState(false);

  useEffect(() => {
    const questionCount = testQuery.data?.data.questions?.length || 0;
    if (questionCount !== answers.length) {
      setAnswers(Array(questionCount).fill(null));
    }
  }, [testQuery.data?.data.id]);

  useDidEffect(() => {
    const allow =
      timeLeft === 0 && timeUntilStart === 0 && !testQuery.isFetching && !!testQuery.data && start;
    if (allow) {
      finishExam();
    }
  }, [timeLeft === 0 && timeUntilStart === 0 && !testQuery.isLoading && start]);

  const nextQuestion = () => {
    if (!testQuery.data) return;
    if (currentQuestionIndex < testQuery.data.data.questions.length - 1) {
      navigate(
        `/student/sessions/${params.sessionId}/exams/start?page=${currentQuestionIndex + 2}`,
      );
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      navigate(`/student/sessions/${params.sessionId}/exams/start?page=${currentQuestionIndex}`);
    }
  };

  const goToQuestion = (index: number) => {
    navigate(`/student/sessions/${params.sessionId}/exams/start?page=${index + 1}`);
  };

  const handleAnswer = (answer: TExamAnswerRequest["questions"][number]) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answer;
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

  const handleFinish = async () => {
    if (!sessionQuery.data) return;
    const indexCurrentTest = sessionQuery.data?.data.tests.findIndex(
      (test) => test.id === currentTest,
    );

    const res = await answerExamMutation.mutateAsync({
      test_id: currentTest || "",
      questions: answersRef.current.filter((answer) => answer !== null),
    });

    answerIdsRef.current.push(res.data.id);

    if (indexCurrentTest < sessionQuery.data?.data.tests.length - 1) {
      const nextTestId = sessionQuery.data?.data.tests[indexCurrentTest + 1].id;
      setCurrentTest(nextTestId);
      answersRef.current = [];
      navigate(`/student/sessions/${params.sessionId}/exams/start?page=1`);
    } else {
      finishExam();
    }
  };

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
          currentQuestion={currentQuestionIndex}
          answers={answers}
          onGoToQuestion={goToQuestion}
          onFinish={handleFinish}
          isSubmitting={isSubmitting}
        />
        <ExamQuestion
          question={testQuery.data?.data.questions[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex}
          totalQuestions={testQuery.data?.data.questions.length || 0}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestionIndex]}
          onPrev={prevQuestion}
          onNext={nextQuestion}
          isSubmitting={isSubmitting}
        />
      </section>
    </div>
  );
};

export default Component;
