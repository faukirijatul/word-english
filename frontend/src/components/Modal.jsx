import { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title = '',
  message = '',
  type = 'confirm',
  confirmText = 'Ya, Hapus',
  cancelText = 'Batal',
  onConfirm = () => {},
  children,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variants = {
    confirm: {
      bg: 'bg-yellow-600',
      text: 'text-yellow-100',
      icon: (
        <svg
          className="w-12 h-12 text-yellow-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    success: {
      bg: 'bg-green-600',
      text: 'text-green-100',
      icon: (
        <svg
          className="w-12 h-12 text-green-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-600',
      text: 'text-red-100',
      icon: (
        <svg
          className="w-12 h-12 text-red-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const variant = variants[type] || variants.confirm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-gray-700">
        {/* Header */}
        <div className={`p-6 ${variant.bg} flex flex-col items-center`}>
          {variant.icon}
          <h2 className={`mt-4 text-2xl font-bold ${variant.text}`}>
            {title || {
              confirm: 'Konfirmasi Hapus',
              success: 'Berhasil',
              error: 'Terjadi Kesalahan',
            }[type]}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          {message && <p className="text-gray-300 text-lg mb-6">{message}</p>}

          {children && <div className="mb-6">{children}</div>}

          {/* Buttons */}
          {type === 'confirm' ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                {confirmText}
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className={`px-8 py-3 ${variant.bg.replace('600', '700')} hover:${variant.bg.replace(
                '600',
                '800'
              )} text-white rounded-lg font-medium transition`}
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}