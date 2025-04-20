import { FC, ReactElement } from "react";

interface ExamStatusProps {
  testName?: string;
  answeredCount: number;
  unansweredCount: number;
  timeLeft: number;
  timeUntilStart: number;
  isLoading: boolean;
  formatTime: (time: number) => string;
}

export const ExamStatus: FC<ExamStatusProps> = ({
  testName,
  answeredCount,
  unansweredCount,
  timeLeft,
  timeUntilStart,
  isLoading,
  formatTime,
}): ReactElement => {
  return (
    <div className="w-full max-w-7xl bg-white mt-6 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-bold text-gray-700">{testName}</h2>
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
          {isLoading
            ? "Memuat waktu..."
            : timeUntilStart > 0
              ? `Ujian dimulai dalam: ${formatTime(timeUntilStart)}`
              : `Waktu Tersisa: ${formatTime(timeLeft)}`}
        </div>
      </div>
    </div>
  );
};