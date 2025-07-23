import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-gray-300 shadow">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-600 p-4 md:p-5">
            <h3 className="text-lg font-medium text-white">
              {title || 'Modal Title'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white transition focus:outline-none"
              style={{
                fontSize: 18,
                lineHeight: 1,
                padding: 0,
                height: 28,
                width: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                borderRadius: '50%',
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 space-y-4 text-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
