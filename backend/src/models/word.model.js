import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema(
  {
    english: { type: String, required: true },
    indonesia: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Word', wordSchema);
