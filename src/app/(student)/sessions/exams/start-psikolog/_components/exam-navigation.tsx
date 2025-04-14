import { FC, ReactElement } from "react";
import { TExamAnswerRequest, TTestDetailResponse } from "@/api/test/type";

interface ExamNavigationProps {
  questions: TTestDetailResponse["data"]["questions"];
  currentQuestion: number;
  answers: TExamAnswerRequest["questions"];
  onGoToQuestion: (index: number) => void;
  onFinish: () => void;
  isSubmitting: boolean;
}

export const ExamNavigation: FC<ExamNavigationProps> = ({
  questions,
  currentQuestion,
  answers,
  onGoToQuestion,
  onFinish,
  isSubmitting,
}): ReactElement => {
  return (
    <aside className="w-1/4 order-2 bg-white mt-6 p-4 rounded-lg shadow-md h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToQuestion(index)}
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
        onClick={onFinish}
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
  );
};
