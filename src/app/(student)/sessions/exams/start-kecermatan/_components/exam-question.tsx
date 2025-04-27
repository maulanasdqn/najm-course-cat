import { FC, ReactElement } from "react";
import { TExamAnswerRequest, TQuestionItem } from "@/api/test/type";
import { ArrowRightIcon } from "@/app/_components/ui/icons/ic-arrow-right";
import { ZoomableImage } from "@/app/_components/ui/zoomable-image";
import DOMPurify from "dompurify";
import "@/app/_components/ui/inputs/wysiwyg-editor/index.css";

// Utility function to safely render HTML content
const sanitizeHTML = (html: string) => {
  return { __html: DOMPurify.sanitize(html) };
};

interface ExamQuestionProps {
  question?: TQuestionItem;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: TExamAnswerRequest["questions"][number]) => void;
  selectedAnswer: TExamAnswerRequest["questions"][number] | null;
  onPrev: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}

export const ExamQuestion: FC<ExamQuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  onNext,
  isSubmitting,
}): ReactElement => {
  return (
    <main className="flex-1 order-1 p-6 pl-0">
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h3 className="text-xl text-gray-800 font-bold">
          Soal Nomor {currentQuestion + 1} dari {totalQuestions}
        </h3>
        <span
          className="wysiwyg-preview"
          dangerouslySetInnerHTML={question ? sanitizeHTML(question.question) : undefined}
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
        <div className="flex flex-col gap-4">
          {question?.options?.map((option, optIndex) => (
            <label
              key={optIndex}
              className="flex flex-col gap-2 border p-4 rounded-md hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option.id}
                  onChange={() => onAnswer({ question_id: question.id, option_id: option.id })}
                  checked={selectedAnswer?.option_id === option.id}
                  className="w-5 h-5 mt-0.5 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-gray-700">{option.label}</span>
              </div>
              {option.image_url && (
                <div className="mt-2 ml-8">
                  <ZoomableImage
                    src={option.image_url}
                    alt="Option Image"
                    className="max-w-full max-h-64 object-contain rounded"
                  />
                </div>
              )}
            </label>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          {currentQuestion < totalQuestions - 1 && (
            <button
              onClick={() => onNext()}
              aria-label="Lanjut ke soal berikutnya"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow transition flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 hover:bg-blue-500 hover:scale-105"
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
          )}
        </div>
      </div>
    </main>
  );
};
