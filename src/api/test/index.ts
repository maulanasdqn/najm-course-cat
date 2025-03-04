import { api } from "@/libs/axios/api";
import questionCognitive from "./questions-cognitive.json";
import questionPersonality from "./questions-personality.json";
import {
  TGetTestsParams,
  TTestUpdateRequest,
  TTestDetailResponse,
  TTestCreateRequest,
  TTestPaginateResponse,
  TTestDeleteResponse,
  TTestUpdateResponse,
  TTestCreateResponse,
  TExamAnswerRequest,
  TExamAnswerResponse,
} from "./type";

export const getTests = async (params: TGetTestsParams): Promise<TTestPaginateResponse> => {
  const { data } = await api.get("/v1/tests", { params });
  return data;
};

export const getTest = async (id: string): Promise<TTestDetailResponse> => {
  if (id === "2") {
    return Promise.resolve({
      status_code: 200,
      message: "Test fetched successfully",
      version: "1",
      data: {
        id: "2",
        session_id: "86e7b57b-7779-4e87-b4e4-ec08604a4e9a",
        test_name: "kognitif",
        created_at: "2023-01-01T00:00:00.000Z",
        updated_at: "2023-01-01T00:00:00.000Z",
        questions: questionCognitive,
      },
    });
  }

  if (id === "1") {
    return Promise.resolve({
      status_code: 200,
      message: "Test fetched successfully",
      version: "1",
      data: {
        id: "1",
        next_test_id: "2",
        session_id: "86e7b57b-7779-4e87-b4e4-ec08604a4e9a",
        test_name: "Kepribadian",
        created_at: "2023-01-01T00:00:00.000Z",
        updated_at: "2023-01-01T00:00:00.000Z",
        questions: questionPersonality,
      },
    });
  }
  return Promise.resolve({
    status_code: 200,
    message: "Test fetched successfully",
    version: "1",
    data: {
      id: "1",
      session_id: "86e7b57b-7779-4e87-b4e4-ec08604a4e9a",
      test_name: "MTK",
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
      questions: [
        {
          id: "1",
          discussion:
            "Aljabar adalah cabang matematika yang menggunakan simbol dan huruf untuk mewakili angka dan kuantitas.",
          question: "Sederhanakan ekspresi berikut: 3x + 2y - x + 5y",
          options: [
            {
              id: "1",
              label: "2x + 3y",
              is_correct: false,
            },
            {
              id: "2",
              label: "4x + 7y",
              is_correct: false,
            },
            {
              id: "3",
              label: "2x + 7y",
              is_correct: true,
            },
            {
              id: "4",
              label: "3x + 5y",
              is_correct: false,
            },
          ],
        },
        {
          id: "2",
          discussion:
            "Persamaan linear adalah persamaan yang dapat ditulis dalam bentuk ax + b = 0, di mana a dan b adalah konstanta dan x adalah variabel.",
          question: "Selesaikan persamaan berikut: 2x - 5 = 3",
          options: [
            {
              id: "1",
              label: "x = 1",
              is_correct: false,
            },
            {
              id: "2",
              label: "x = 2",
              is_correct: false,
            },
            {
              id: "3",
              label: "x = 4",
              is_correct: true,
            },
            {
              id: "4",
              label: "x = 8",
              is_correct: false,
            },
          ],
        },
        {
          id: "3",
          discussion:
            "Geometri adalah cabang matematika yang mempelajari tentang bentuk, ukuran, posisi relatif gambar, dan sifat ruang.",
          question: "Hitung luas persegi panjang dengan panjang 8 cm dan lebar 5 cm.",
          options: [
            {
              id: "1",
              label: "13 cm²",
              is_correct: false,
            },
            {
              id: "2",
              label: "26 cm²",
              is_correct: false,
            },
            {
              id: "3",
              label: "40 cm²",
              is_correct: true,
            },
            {
              id: "4",
              label: "80 cm²",
              is_correct: false,
            },
          ],
        },
        {
          id: "4",
          discussion:
            "Trigonometri adalah cabang matematika yang mempelajari hubungan antara sudut dan sisi segitiga.",
          question: "Nilai sin 30° adalah...",
          options: [
            {
              id: "1",
              label: "0",
              is_correct: false,
            },
            {
              id: "2",
              label: "1/2",
              is_correct: true,
            },
            {
              id: "3",
              label: "√2/2",
              is_correct: false,
            },
            {
              id: "4",
              label: "1",
              is_correct: false,
            },
          ],
        },
        {
          id: "5",
          discussion:
            "Statistika adalah cabang matematika yang mempelajari pengumpulan, analisis, interpretasi, presentasi, dan organisasi data.",
          question: "Hitung rata-rata dari data berikut: 4, 6, 8, 10, 12",
          options: [
            {
              id: "1",
              label: "6",
              is_correct: false,
            },
            {
              id: "2",
              label: "8",
              is_correct: true,
            },
            {
              id: "3",
              label: "10",
              is_correct: false,
            },
            {
              id: "4",
              label: "12",
              is_correct: false,
            },
          ],
        },
        {
          id: "6",
          discussion:
            "Bilangan prima adalah bilangan yang hanya memiliki dua faktor, yaitu 1 dan bilangan itu sendiri.",
          question: "Manakah di bawah ini yang merupakan bilangan prima?",
          options: [
            {
              id: "1",
              label: "1",
              is_correct: false,
            },
            {
              id: "2",
              label: "4",
              is_correct: false,
            },
            {
              id: "3",
              label: "7",
              is_correct: true,
            },
            {
              id: "4",
              label: "9",
              is_correct: false,
            },
          ],
        },
        {
          id: "7",
          discussion: "Pecahan adalah bilangan yang menyatakan sebagian dari keseluruhan.",
          question: "Sederhanakan pecahan berikut: 12/18",
          options: [
            {
              id: "1",
              label: "1/2",
              is_correct: false,
            },
            {
              id: "2",
              label: "2/3",
              is_correct: true,
            },
            {
              id: "3",
              label: "3/4",
              is_correct: false,
            },
            {
              id: "4",
              label: "4/5",
              is_correct: false,
            },
          ],
        },
        {
          id: "8",
          discussion: "Desimal adalah bilangan yang menggunakan sistem bilangan basis 10.",
          question: "Ubahlah pecahan 3/4 menjadi desimal.",
          options: [
            {
              id: "1",
              label: "0.25",
              is_correct: false,
            },
            {
              id: "2",
              label: "0.5",
              is_correct: false,
            },
            {
              id: "3",
              label: "0.75",
              is_correct: true,
            },
            {
              id: "4",
              label: "1.0",
              is_correct: false,
            },
          ],
        },
        {
          id: "9",
          discussion: "Persentase adalah cara untuk menyatakan bilangan sebagai pecahan dari 100.",
          question: "Hitung 20% dari 50.",
          options: [
            {
              id: "1",
              label: "5",
              is_correct: false,
            },
            {
              id: "2",
              label: "10",
              is_correct: true,
            },
            {
              id: "3",
              label: "15",
              is_correct: false,
            },
            {
              id: "4",
              label: "20",
              is_correct: false,
            },
          ],
        },
        {
          id: "10",
          discussion: "Perbandingan adalah cara untuk membandingkan dua kuantitas.",
          question: "Sederhanakan perbandingan berikut: 15:25",
          options: [
            {
              id: "1",
              label: "1:2",
              is_correct: false,
            },
            {
              id: "2",
              label: "2:3",
              is_correct: false,
            },
            {
              id: "3",
              label: "3:5",
              is_correct: true,
            },
            {
              id: "4",
              label: "5:7",
              is_correct: false,
            },
          ],
        },
        {
          id: "11",
          discussion:
            "Skala adalah perbandingan antara ukuran pada peta atau model dengan ukuran sebenarnya.",
          question:
            "Jika skala peta adalah 1:100.000, berapa jarak sebenarnya jika jarak pada peta adalah 5 cm?",
          options: [
            {
              id: "1",
              label: "5 km",
              is_correct: true,
            },
            {
              id: "2",
              label: "10 km",
              is_correct: false,
            },
            {
              id: "3",
              label: "15 km",
              is_correct: false,
            },
            {
              id: "4",
              label: "20 km",
              is_correct: false,
            },
          ],
        },

        {
          id: "12",
          discussion: "Volume adalah ukuran ruang tiga dimensi yang ditempati oleh suatu objek.",
          question: "Hitung volume kubus dengan sisi 4 cm.",
          options: [
            {
              id: "1",
              label: "12 cm³",
              is_correct: false,
            },
            {
              id: "2",
              label: "16 cm³",
              is_correct: false,
            },
            {
              id: "3",
              label: "64 cm³",
              is_correct: true,
            },
            {
              id: "4",
              label: "128 cm³",
              is_correct: false,
            },
          ],
        },
        {
          id: "13",
          discussion:
            "Luas permukaan adalah jumlah total luas semua permukaan suatu objek tiga dimensi.",
          question: "Hitung luas permukaan kubus dengan sisi 3 cm.",
          options: [
            {
              id: "1",
              label: "9 cm²",
              is_correct: false,
            },
            {
              id: "2",
              label: "27 cm²",
              is_correct: false,
            },
            {
              id: "3",
              label: "54 cm²",
              is_correct: true,
            },
            {
              id: "4",
              label: "81 cm²",
              is_correct: false,
            },
          ],
        },

        {
          id: "14",
          discussion: "Bangun datar adalah objek dua dimensi yang memiliki panjang dan lebar.",
          question: "Hitung keliling lingkaran dengan jari-jari 7 cm. (π = 22/7)",
          options: [
            {
              id: "1",
              label: "22 cm",
              is_correct: false,
            },
            {
              id: "2",
              label: "44 cm",
              is_correct: true,
            },
            {
              id: "3",
              label: "88 cm",
              is_correct: false,
            },
            {
              id: "4",
              label: "154 cm",
              is_correct: false,
            },
          ],
        },
        {
          id: "15",
          discussion:
            "Bangun ruang adalah objek tiga dimensi yang memiliki panjang, lebar, dan tinggi.",
          question: "Hitung volume bola dengan jari-jari 3 cm. (π = 3.14)",
          options: [
            {
              id: "1",
              label: "28.26 cm³",
              is_correct: false,
            },
            {
              id: "2",
              label: "36 cm³",
              is_correct: false,
            },
            {
              id: "3",
              label: "113.04 cm³",
              is_correct: true,
            },
            {
              id: "4",
              label: "226.08 cm³",
              is_correct: false,
            },
          ],
        },
        {
          id: "16",
          discussion:
            "Fungsi adalah hubungan antara setiap elemen dari satu set dengan elemen unik dari set lain.",
          question: "Jika f(x) = 2x + 3, hitung f(5).",
          options: [
            {
              id: "1",
              label: "8",
              is_correct: false,
            },
            {
              id: "2",
              label: "10",
              is_correct: false,
            },
            {
              id: "3",
              label: "13",
              is_correct: true,
            },
            {
              id: "4",
              label: "15",
              is_correct: false,
            },
          ],
        },
        {
          id: "17",
          discussion:
            "Limit adalah nilai yang didekati oleh suatu fungsi ketika input mendekati suatu nilai tertentu.",
          question: "Hitung limit dari (x² - 4) / (x - 2) ketika x mendekati 2.",
          options: [
            {
              id: "1",
              label: "0",
              is_correct: false,
            },
            {
              id: "2",
              label: "2",
              is_correct: false,
            },
            {
              id: "3",
              label: "4",
              is_correct: true,
            },
            {
              id: "4",
              label: "Tidak terdefinisi",
              is_correct: false,
            },
          ],
        },
        {
          id: "18",
          discussion:
            "Turunan adalah ukuran seberapa cepat suatu fungsi berubah seiring perubahan input.",
          question: "Hitung turunan dari f(x) = 3x² + 2x - 1.",
          options: [
            {
              id: "1",
              label: "3x + 2",
              is_correct: false,
            },
            {
              id: "2",
              label: "6x",

              is_correct: false,
            },
            {
              id: "3",
              label: "6x + 2",
              is_correct: true,
            },
            {
              id: "4",
              label: "x² + x - 1",
              is_correct: false,
            },
          ],
        },
        {
          id: "19",
          discussion: "Integral adalah operasi matematika yang merupakan kebalikan dari turunan.",
          question: "Hitung integral dari f(x) = 2x.",
          options: [
            {
              id: "1",
              label: "2",
              is_correct: false,
            },
            {
              id: "2",
              label: "x",
              is_correct: false,
            },
            {
              id: "3",
              label: "x² + C",
              is_correct: true,
            },
            {
              id: "4",
              label: "2x² + C",
              is_correct: false,
            },
          ],
        },

        {
          id: "20",
          discussion: "Matriks adalah susunan bilangan dalam baris dan kolom.",
          question: "Hitung hasil perkalian matriks berikut: [[1, 2], [3, 4]] * [[2, 0], [1, 1]]",
          options: [
            {
              id: "1",
              label: "[[2, 0], [3, 4]]",
              is_correct: false,
            },

            {
              id: "2",
              label: "[[3, 2], [7, 4]]",
              is_correct: false,
            },
            {
              id: "3",
              label: "[[4, 2], [10, 4]]",
              is_correct: true,
            },
            {
              id: "4",
              label: "[[1, 0], [0, 1]]",
              is_correct: false,
            },
          ],
        },
      ],
    },
  });
  const { data } = await api.get(`/v1/tests/detail/${id}`);
  return data;
};

export const createTest = async (payload: TTestCreateRequest): Promise<TTestCreateResponse> => {
  const { data } = await api.post("/v1/tests/create", payload);
  return data;
};

export const updateTest = async (
  id: string,
  payload: TTestUpdateRequest,
): Promise<TTestUpdateResponse> => {
  const { data } = await api.put(`/v1/tests/update/${id}`, payload);
  return data;
};

export const deleteTest = async (id: string): Promise<TTestDeleteResponse> => {
  const { data } = await api.delete(`/v1/tests/delete/${id}`);
  return data;
};

export const answerExam = async (payload: TExamAnswerRequest): Promise<TExamAnswerResponse> => {
  return Promise.resolve({
    status_code: 200,
    message: "Exam answered successfully",
  });
  const { data } = await api.post(`/v1/tests/answer/create`, payload);
  return data;
};
