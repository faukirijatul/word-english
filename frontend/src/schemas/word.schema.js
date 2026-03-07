import * as z from 'zod';

const wordSchema = z.object({
  english: z
    .string()
    .trim()
    .min(1, { message: 'Kolom English wajib diisi' }),
  indonesia: z
    .string()
    .trim()
    .min(1, { message: 'Kolom Indonesia wajib diisi' }),
});

export default wordSchema;