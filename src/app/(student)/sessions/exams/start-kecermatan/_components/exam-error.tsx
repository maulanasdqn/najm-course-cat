import { FC, ReactElement } from "react";

interface ExamErrorProps {
  error: unknown;
  onRetry: () => void;
}

export const ExamError: FC<ExamErrorProps> = ({ error, onRetry }): ReactElement => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gagal Memuat Ujian</h2>
        <p className="text-gray-600 mb-6">
          {error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat data ujian."}
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
};