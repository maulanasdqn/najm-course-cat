import { FC, ReactElement } from "react";

interface ExamStartPromptProps {
  onStart: () => void;
  isPending: boolean;
  timeUntilStart: number;
  timeLeft: number;
  formatTime: (time: number) => string;
}

export const ExamStartPrompt: FC<ExamStartPromptProps> = ({ onStart, isPending, timeUntilStart, timeLeft, formatTime }): ReactElement => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full bg-gray-100">
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
        <button
          onClick={onStart}
          className="w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={isPending || timeUntilStart > 0 || timeLeft <= 0}
        >
          {isPending
            ? "Memuat..."
            : timeUntilStart > 0
            ? `Mulai dalam ${formatTime(timeUntilStart)}`
            : timeLeft <= 0
            ? "Waktu Habis"
            : "Mulai Ujian"}
        </button>
      </div>
    </div>
  );
};