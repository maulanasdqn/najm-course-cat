/**
 * Global Zod error messages in Indonesian
 * This file centralizes all validation error messages for consistency
 */

export const ZodMessagesId = {
  // Generic errors
  required: "Kolom ini wajib diisi",
  invalid: "Input tidak valid",
  
  // String validations
  string: {
    min: (min: number) => `Minimal ${min} karakter`,
    max: (max: number) => `Maksimal ${max} karakter`,
    email: "Alamat email tidak valid",
  },
  
  // Number validations
  number: {
    min: (min: number) => `Minimal ${min}`,
    max: (max: number) => `Maksimal ${max}`,
    integer: "Harus berupa bilangan bulat",
    positive: "Harus berupa bilangan positif",
  },
  
  // Password validations
  password: {
    required: "Kata sandi wajib diisi",
    min: "Kata sandi minimal 8 karakter",
    uppercase: "Kata sandi harus mengandung minimal satu huruf kapital",
    lowercase: "Kata sandi harus mengandung minimal satu huruf kecil",
    number: "Kata sandi harus mengandung minimal satu angka",
    mismatch: "Kata sandi tidak cocok",
  },
  
  // Phone validations
  phone: {
    required: "Nomor telepon wajib diisi",
    format: "Nomor telepon hanya boleh berisi angka",
    length: "Nomor telepon harus antara 10-15 digit",
  },
  
  // Form validations
  form: {
    terms: "Anda harus menyetujui syarat dan ketentuan",
  },
  
  // Student specific
  student: {
    type: "Jenis siswa wajib diisi",
  },
  
  // Test specific
  test: {
    weight: "Bobot tes tidak boleh melebihi 100%",
    dateOverlap: "Rentang tanggal tes tidak boleh tumpang tindih",
    points: "Poin diperlukan untuk kategori ini",
  }
};