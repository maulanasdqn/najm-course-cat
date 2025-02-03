import { FC, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "./_hooks/exam";
import toast from "react-hot-toast";

export const Component: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { startExam } = useExam({
    onFinish: () => {
      // TODO: mutate finish exam
      navigate("/student/course");
      toast.success("Ujian telah selesai.");
    },
  });
  const [sessionNumber, setSessionNumber] = useState("");

  const handleStart = () => {
    if (sessionNumber.trim() !== "") {
      startExam();
      navigate(`/student/exams/1?page=1&session=${sessionNumber}`);
    } else {
      alert("Silakan masukkan nomor sesi sebelum memulai ujian.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pemberitahuan</h2>
        <p className="text-gray-600 mb-6">
          Sebelum memulai ujian, pastikan Anda telah membaca petunjuk berikut:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            Keluar dari fullscreen mode akan menyelesaikan ujian.
          </li>
          <li>Pastikan Anda memiliki koneksi internet yang stabil.</li>
          <li>Waktu ujian akan dimulai setelah Anda menekan tombol "Mulai Ujian".</li>
          <li>Setiap soal wajib dijawab sebelum menyelesaikan ujian.</li>
        </ul>
        <label className="block mb-4">
          <span className="text-gray-700">Masukkan Nomor Sesi:</span>
          <input
            type="text"
            value={sessionNumber}
            onChange={(e) => setSessionNumber(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: 12345"
          />
        </label>
        <button
          onClick={handleStart}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Mulai Ujian
        </button>
      </div>
    </div>
  );
};
