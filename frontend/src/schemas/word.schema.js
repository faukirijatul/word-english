import * as z from 'zod';

const wordSchema = z.object({
  english: z
    .string()
    .trim()
    .min(1, { message: 'Kolom English wajib diisi' })
    .max(100, { message: 'Maksimal 100 karakter' }),
  indonesia: z
    .string()
    .trim()
    .min(1, { message: 'Kolom Indonesia wajib diisi' })
    .max(100, { message: 'Maksimal 100 karakter' }),
});

export default wordSchema;