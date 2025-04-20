import { FC, ReactElement } from "react";

interface ExamCountdownProps {
  timeUntilStart: number;
  testName?: string;
  onStart: () => void;
  formatTime: (time: number) => string;
}

export const ExamCountdown: FC<ExamCountdownProps> = ({
  timeUntilStart,
  testName,
  onStart,
  formatTime,
}): ReactElement => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ujian Belum Dimulai</h2>
        <p className="text-gray-600 mb-6">Ujian akan dimulai dalam:</p>
        {timeUntilStart > 0 ? (
          <div className="text-4xl font-bold text-blue-600">{formatTime(timeUntilStart)}</div>
        ) : (
          <button
            onClick={onStart}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mulai Ujian
          </button>
        )}
        <div className="mt-6 text-sm text-gray-500">
          {testName && <p className="font-medium">Ujian: {testName}</p>}
          <p>Halaman akan otomatis diperbarui saat ujian dimulai</p>
        </div>
      </div>
    </div>
  );
};