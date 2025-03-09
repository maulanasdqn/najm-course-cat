import { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useGetTestAnswer } from "./_hooks/use-get-tests-query";

export const Component: FC = (): ReactElement => {
  const params = useParams<{ examId: string; sessionId: string }>();
  const testQuery = useGetTestAnswer(params.examId!);

  // Calculate correct answers and score
  const correctAnswers =
    testQuery.data?.data.questions.reduce((acc, question) => {
      const selectedOption = question.options.find((option) => option.is_selected);
      return selectedOption?.is_correct ? acc + 1 : acc;
    }, 0) || 0;

  const totalQuestions = testQuery.data?.data.questions.length || 0;
  const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const finalScore = Math.round(scorePercentage);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100 min-h-screen">
      <section className="flex flex-1 w-full max-w-7xl">
        <main className="flex-1 flex flex-col gap-4 p-6">
          {/* Enhanced Result Card */}
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-center items-center mb-6">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Hasil Ujian
              </h2>
            </div>

            {/* Score visualization */}
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* Score details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Jawaban yang Benar</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600">{correctAnswers}</span>
                      <span className="text-gray-500 ml-1">/ {totalQuestions}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circular progress indicator */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                  {/* Progress circle - the stroke-dasharray and stroke-dashoffset create the partial circle effect */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      scorePercentage >= 60
                        ? "#4ade80"
                        : scorePercentage >= 40
                          ? "#facc15"
                          : "#ef4444"
                    }
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * scorePercentage) / 100}
                    transform="rotate(-90 50 50)"
                  />
                  {/* Text in the middle */}
                  <text
                    x="50"
                    y="50"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill={
                      scorePercentage >= 60
                        ? "#16a34a"
                        : scorePercentage >= 40
                          ? "#ca8a04"
                          : "#dc2626"
                    }
                  >
                    {finalScore}
                  </text>
                  <text
                    x="50"
                    y="65"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    Skor Akhir
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Questions Review Section */}
          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Ulasan Pertanyaan</h3>

          {testQuery.data?.data.questions.map((question, index) => {
            const selectedOption = question.options.find((option) => option.is_selected);
            const isCorrect = selectedOption?.is_correct;

            return (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-6 border-l-4 mb-4 transition-all hover:shadow-md"
                style={{ borderLeftColor: isCorrect ? "#4ade80" : "#f87171" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    <span className="inline-block bg-gray-200 text-gray-700 rounded-full w-8 h-8 text-center leading-8 mr-2">
                      {index + 1}
                    </span>
                    {question.question}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <div className="flex flex-col gap-3 ml-10">
                  {question.options.map((option, optIndex) => {
                    const isSelected = option.is_selected;
                    const isCorrectOption = option.is_correct;

                    let optionClass = "border rounded-lg p-3 transition-all";
                    if (isSelected) {
                      optionClass += isCorrectOption
                        ? " bg-green-50 border-green-300"
                        : " bg-red-50 border-red-300";
                    } else if (isCorrectOption) {
                      optionClass += " bg-green-50 border-green-300";
                    } else {
                      optionClass += " border-gray-200 hover:bg-gray-50";
                    }

                    return (
                      <div key={optIndex} className={optionClass}>
                        <label className="flex items-center gap-3 cursor-default">
                          <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                              isSelected
                                ? isCorrectOption
                                  ? "border-green-500 bg-green-500"
                                  : "border-red-500 bg-red-500"
                                : isCorrectOption
                                  ? "border-green-500 bg-green-500"
                                  : "border-gray-300"
                            }`}
                          >
                            {(isSelected || isCorrectOption) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className={`text-gray-700 ${isCorrectOption ? "font-medium" : ""}`}>
                            {option.label}
                          </span>

                          {isSelected && !isCorrectOption && (
                            <span className="ml-auto text-red-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}

                          {isCorrectOption && (
                            <span className="ml-auto text-green-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation - would come from the API in a real implementation */}
                {!isCorrect && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800 ml-10">
                    <p className="font-medium mb-1">Explanation:</p>
                    <p className="text-sm">{question.discussion}</p>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </section>
    </div>
  );
};
