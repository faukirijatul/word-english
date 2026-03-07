import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import wordSchema from '../schemas/word.schema';
import { useEffect } from 'react';

export default function WordForm({ wordToEdit, onSubmit, onCancel }) {
  const isEditMode = !!wordToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      english: '',
      indonesia: '',
    },
  });

  useEffect(() => {
    reset({
      english: wordToEdit?.english || '',
      indonesia: wordToEdit?.indonesia || '',
    });
  }, [wordToEdit, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
    if (!isEditMode) {
      reset();
    }
  };

  const handleCancelClick = () => {
    reset();
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">
        {isEditMode ? 'Edit Kata' : 'Tambah Kata Baru'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Field English */}
        <div>
          <label className="block text-gray-300 mb-1">English</label>
          <input
            type="text"
            {...register('english')}
            className={`w-full px-4 py-2 bg-gray-900 border ${
              errors.english ? 'border-red-500' : 'border-gray-700'
            } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="Masukkan kata dalam bahasa Inggris"
          />
          {errors.english && (
            <p className="mt-1 text-sm text-red-500">{errors.english.message}</p>
          )}
        </div>

        {/* Field Indonesia */}
        <div>
          <label className="block text-gray-300 mb-1">Indonesia</label>
          <input
            type="text"
            {...register('indonesia')}
            className={`w-full px-4 py-2 bg-gray-900 border ${
              errors.indonesia ? 'border-red-500' : 'border-gray-700'
            } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="Masukkan terjemahan dalam bahasa Indonesia"
          />
          {errors.indonesia && (
            <p className="mt-1 text-sm text-red-500">{errors.indonesia.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg font-medium text-white ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isEditMode ? 'Update' : 'Simpan'}
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={handleCancelClick}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}