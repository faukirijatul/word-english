import { useEffect, useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className='relative mb-6'>
      <input
        type='text'
        value={search}
        onChange={handleChange}
        placeholder='Cari kata (English / Indonesia)...'
        className='w-full px-4 py-3 pl-10 pr-4 text-lg bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
      />
      <svg
        className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
    </div>
  );
}
