export default function WordCard({ word, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-indigo-400">{word.english}</h3>
          <p className="text-gray-300 mt-1">{word.indonesia}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(word)}
            className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(word._id)}
            className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}