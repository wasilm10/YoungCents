import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const Emojipick = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Picker trigger */}
      <div
        className="flex cursor-pointer items-center space-x-2 rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        {icon ? (
          <img src={icon} alt="Icon" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <LuImage className="h-6 w-6" />
        )}
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {icon ? 'Change Icon' : 'Pick Icon'}
        </p>
      </div>

      {/* Picker modal */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800">
          <div className="flex justify-end">
            <button
              className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl||"");
              setIsOpen(false);
            }}
            
          />
        </div>
      )}
    </div>
  );
};

export default Emojipick;
