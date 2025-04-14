import { FC, ReactElement } from "react";

export const ExamLoading: FC = (): ReactElement => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Memuat Ujian...</h2>
        <p className="text-gray-600">Mohon tunggu sebentar</p>
      </div>
    </div>
  );
};