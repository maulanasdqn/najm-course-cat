import { z } from "zod";

const userSchema = z.object({
  avatar: z.string().optional(),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), "Format tanggal tidak valid"),
  email: z.string().email("Email tidak valid"),
  fullname: z.string().min(1, "Nama lengkap wajib diisi"),
  gender: z.enum(["male", "female", "other"]),
  identity_number: z.string().min(1, "Nomor identitas wajib diisi"),
  phone_number: z.string().regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka"),
  religion: z.string().optional(),
  address: z.string().optional(),
  experience: z.string().optional(),
  school: z.string().optional(),
  role_id: z.string().min(1, "ID peran wajib diisi"),
  student_type: z.string().min(1, "Jenis siswa wajib diisi"),
});

export default userSchema;
