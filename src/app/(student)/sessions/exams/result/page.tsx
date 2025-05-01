import { FC, ReactElement, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetTestAnswer } from "./_hooks/use-get-tests-query";
import DOMPurify from "dompurify";
import "@/app/_components/ui/inputs/wysiwyg-editor/index.css";
import { Tabs } from "@/app/_components/ui/tabs";
import { ZoomableImage } from "@/app/_components/ui/zoomable-image";

// Utility function to safely render HTML content
const sanitizeHTML = (html: string | undefined) => {
  return { __html: DOMPurify.sanitize(html || "") };
};

// Define types to prevent type issues
interface Option {
  id: string;
  label: string;
  is_correct: boolean;
  is_user_selected: boolean;
  image_url: string;
}

interface Question {
  id: string;
  question: string;
  question_image_url: string;
  options: Option[];
  discussion?: string;
  discussion_image_url?: string;
}

// Type for the refetch function
type RefetchFunction = () => void;

// Reusable components to reduce duplication
const LoadingState: FC = (): ReactElement => (
  <div className="flex-1 flex flex-col items-center justify-center w-full bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Memuat Hasil Ujian...</h2>
      <p className="text-gray-600">Mohon tunggu sebentar</p>
    </div>
  </div>
);

interface ErrorStateProps {
  refetch: RefetchFunction;
}

const ErrorState: FC<ErrorStateProps> = ({ refetch }): ReactElement => (
  <div className="flex-1 flex flex-col items-center justify-center w-full bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
      <div className="text-red-500 text-6xl mb-6">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Gagal Memuat Hasil Ujian</h2>
      <p className="text-gray-600 mb-6">Terjadi kesalahan saat memuat hasil ujian.</p>
      <button
        onClick={refetch}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Coba Lagi
      </button>
    </div>
  </div>
);

interface ScoreCardProps {
  label: string;
  value: number | string;
  color: string;
}

const ScoreCard: FC<ScoreCardProps> = ({ label, value, color }): ReactElement => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <h3 className="text-lg font-medium text-gray-700 mb-2">{label}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

interface QuestionDetailProps {
  question: Question;
  index: number;
}

const QuestionDetail: FC<QuestionDetailProps> = ({ question, index }): ReactElement => {
  const correctOption = question.options.find((opt) => opt.is_correct);
  const selectedOption = question.options.find((opt) => opt.is_user_selected);
  const isCorrect = correctOption && selectedOption && correctOption.id === selectedOption.id;

  return (
    <div
      className={`border rounded-lg p-5 ${
        isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
      } shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center">
          <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
            {index + 1}
          </span>
          Soal {index + 1}
        </h4>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isCorrect ? "Benar" : "Salah"}
        </span>
      </div>
      <p className="text-gray-700 mb-5 text-base">
        <span
          className="wysiwyg-preview"
          dangerouslySetInnerHTML={sanitizeHTML(question.question)}
        />

        {question?.question_image_url ? (
          <div className="mb-8 flex justify-center items-center">
            <ZoomableImage
              src={question.question_image_url || ""}
              alt="Question Image"
              className="max-w-full max-h-96 object-contain rounded-md shadow-md"
            />
          </div>
        ) : null}
      </p>

      <div className="space-y-3">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-md ${
              option.is_user_selected && option.is_correct
                ? "bg-green-100 border border-green-300"
                : option.is_user_selected && !option.is_correct
                  ? "bg-red-100 border border-red-300"
                  : option.is_correct
                    ? "bg-green-50 border border-green-200"
                    : "bg-white border border-gray-200"
            } transition-colors`}
          >
            <div className="flex items-start">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 mr-3 ${
                  option.is_user_selected
                    ? option.is_correct
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : option.is_correct
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                }`}
              >
                {option.is_user_selected ? "✓" : option.is_correct ? "✓" : ""}
              </div>
              <span
                className={`text-base ${
                  option.is_user_selected || option.is_correct ? "font-medium" : ""
                }`}
              >
                {option.label}

                {option.image_url && (
                  <div className="mt-2">
                    <ZoomableImage
                      src={option.image_url}
                      alt="Option Image"
                      className="max-w-full max-h-64 object-contain rounded"
                    />
                  </div>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {question.discussion && (
        <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <h5 className="text-md font-medium text-blue-800 mb-2">Pembahasan:</h5>
          <p className="text-blue-700 text-base">{question.discussion}</p>

          {question?.discussion_image_url ? (
            <div className="mb-8 flex justify-center items-center">
              <ZoomableImage
                src={question.question_image_url || ""}
                alt="Question Image"
                className="max-w-full max-h-96 object-contain rounded-md shadow-md"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export const Component: FC = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const answerIds = searchParams.get("answerIds")?.split(",") || [];
  const [activeTab, setActiveTab] = useState<React.Key>(answerIds[0] || "");

  useEffect(() => {
    if (answerIds.length > 0 && !activeTab) {
      setActiveTab(answerIds[0]);
    }
  }, [answerIds, activeTab]);

  // Cast activeTab to string to ensure it's a valid parameter for the query
  const testAnswerQuery = useGetTestAnswer(activeTab as string);

  if (testAnswerQuery.isLoading) {
    return <LoadingState />;
  }

  if (testAnswerQuery.isError) {
    return <ErrorState refetch={testAnswerQuery.refetch} />;
  }

  // Check if data exists to prevent type errors
  if (!testAnswerQuery.data) {
    return <ErrorState refetch={testAnswerQuery.refetch} />;
  }

  // Calculate results
  const totalQuestions = testAnswerQuery.data.data.questions.length || 0;
  const correctAnswers =
    testAnswerQuery.data.data.questions.reduce((acc, question) => {
      const correctOption = question.options.find((opt) => opt.is_correct);
      const selectedOption = question.options.find((opt) => opt.is_user_selected);
      return correctOption && selectedOption && correctOption.id === selectedOption.id
        ? acc + 1
        : acc;
    }, 0) || 0;
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Determine score color based on percentage
  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const tabItems = answerIds.map((id, index) => ({
    key: id,
    label: `Test ${index + 1}`,
    children: (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ScoreCard label="Total Soal" value={totalQuestions} color="text-blue-600" />
          <ScoreCard label="Jawaban Benar" value={correctAnswers} color="text-green-600" />
          <ScoreCard label="Jawaban Salah" value={incorrectAnswers} color="text-red-600" />
          <ScoreCard
            label="Skor"
            value={`${testAnswerQuery.data.data?.score}`}
            color={getScoreColor(testAnswerQuery.data.data?.score)}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 px-1 pb-2 border-b border-gray-200">
            Detail Jawaban
          </h3>
          {testAnswerQuery.data.data.questions.map((question, index) => (
            <QuestionDetail key={question.id} question={question} index={index} />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100 p-4 md:p-6">
      <section className="flex flex-col w-full max-w-7xl">
        <div className="mb-6 w-full">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Hasil Ujian</h2>
              <p className="text-gray-600">Berikut adalah hasil ujian Anda:</p>
            </div>

            {answerIds.length > 1 ? (
              <>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg shadow-sm border border-blue-100 mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Skor Total</h3>
                  <div className="flex items-center">
                    <p
                      className={`text-4xl font-bold ${getScoreColor(testAnswerQuery.data.data?.score)} mr-3`}
                    >
                      {testAnswerQuery.data.data?.score}
                    </p>
                    <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          testAnswerQuery.data.data?.score >= 80
                            ? "bg-green-500"
                            : testAnswerQuery.data.data?.score >= 60
                              ? "bg-blue-500"
                              : testAnswerQuery.data.data?.score >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${testAnswerQuery.data.data?.score}` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <Tabs
                  activeTab={activeTab}
                  onTabChange={(tab) => setActiveTab(tab)}
                  items={tabItems}
                />
              </>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <ScoreCard label="Total Soal" value={totalQuestions} color="text-blue-600" />
                  <ScoreCard label="Jawaban Benar" value={correctAnswers} color="text-green-600" />
                  <ScoreCard label="Jawaban Salah" value={incorrectAnswers} color="text-red-600" />
                  <ScoreCard
                    label="Skor"
                    value={`${testAnswerQuery.data.data?.score}`}
                    color={getScoreColor(testAnswerQuery.data.data?.score)}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 px-1 pb-2 border-b border-gray-200">
                    Detail Jawaban
                  </h3>
                  {testAnswerQuery.data.data.questions.map((question, index) => (
                    <QuestionDetail key={question.id} question={question} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Component;
