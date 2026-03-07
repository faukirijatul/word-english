import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WordGroup from '../components/WordGroup';
import WordForm from '../components/WordForm';
import {
  createWordService,
  deleteWordByIdService,
  getAllWordsService,
  updateWordByIdService,
} from '../services/word.service';
import Modal from '../components/Modal';

export default function WordsPage() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState('');
  const [editingWord, setEditingWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const openModal = (type, title, message, onConfirm = () => {}) => {
    setModalState({ isOpen: true, type, title, message, onConfirm });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const fetchWords = async (searchTerm = '') => {
      setLoading(true);
      try {
        const res = await getAllWordsService(searchTerm);
        setWords(res.words || []);
      } catch (err) {
        console.error(err);
        openModal(
          'error',
          'Gagal',
          err.response?.data?.message || 'Terjadi kesalahan.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWords(search);
  }, [search]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCreateOrUpdate = async (payload) => {
    try {
      let res;
      if (editingWord) {
        res = await updateWordByIdService(editingWord._id, payload);

        setWords((prev) =>
          prev.map((word) => (word._id === editingWord._id ? res.word : word)),
        );
      } else {
        res = await createWordService(payload);

        setWords((prev) => [...prev, res.word]);
      }
      setEditingWord(null);

      openModal(
        'success',
        'Berhasil',
        res.message || 'Operasi berhasil dilakukan.',
      );
    } catch (err) {
      openModal(
        'error',
        'Gagal',
        err.response?.data?.message || 'Terjadi kesalahan',
      );
    }
  };

  const handleDelete = async (id) => {
    openModal(
      'confirm',
      'Hapus Kata Ini?',
      'Kata ini akan dihapus permanen dan tidak bisa dikembalikan.',
      async () => {
        try {
          await deleteWordByIdService(id);

          setWords((prev) => prev.filter((word) => word._id !== id));

          openModal('success', 'Berhasil', 'Kata berhasil dihapus.');
        } catch (err) {
          openModal(
            'error',
            'Gagal Menghapus',
            err.response?.data?.message || 'Terjadi kesalahan di server',
          );
        }
      },
    );
  };

  const handleEdit = (word) => {
    setEditingWord(word);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const groupedWords = words.reduce((acc, word) => {
    const firstLetter = word.english[0]?.toUpperCase() || '#';
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(word);
    return acc;
  }, {});

  const sortedGroups = Object.keys(groupedWords).sort();

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-10 text-indigo-400'>
          Kamus English - Indonesia
        </h1>

        <WordForm
          wordToEdit={editingWord}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingWord(null)}
        />

        <SearchBar onSearch={handleSearch} />

        <p className='text-end my-3 text-gray-300'>
          {words.length} Word{words.length !== 1 && 's'}
        </p>

        {loading && <div className='text-center py-10 text-xl'>Memuat...</div>}

        {!loading && sortedGroups.length === 0 && (
          <div className='text-center py-10 text-xl text-gray-400'>
            Tidak ada kata ditemukan
          </div>
        )}

        {!loading &&
          sortedGroups.map((letter) => (
            <WordGroup
              key={letter}
              letter={letter}
              words={groupedWords[letter]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
      />
    </div>
  );
}
