import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const Component: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handleRetake = () => {
    navigate("/student/exams/1?page=1");
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Selamat</h2>
        <p className="text-gray-600 ">Anda Sudah mengerjakan soal ini dengan baik !</p>
        <p className="text-gray-600 ">
          Ayo lanjut ke test selanjutnya dan selesaikan semua test mu{" "}
        </p>
      </div>
      <div className="flex justify-end py-4">
        <button
          onClick={handleRetake}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ulangi Ujian
        </button>
      </div>
    </div>
  );
};

export default Component;
