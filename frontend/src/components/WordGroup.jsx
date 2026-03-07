import WordCard from './WordCard';

export default function WordGroup({ letter, words, onEdit, onDelete }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-indigo-300 mb-4 sticky top-0 bg-gray-900 py-2 z-10 border-b border-gray-700">
        {letter}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map((word) => (
          <WordCard
            key={word._id}
            word={word}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}