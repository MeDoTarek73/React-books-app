import React from 'react';
import { BookOpenIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'; 

function SearchTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => onTabChange('myReads')}
        className={`
          px-4 py-2 rounded-md focus:outline-none 
          flex items-center
          ${activeTab === 'myReads' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}
        `}
      >
        <BookOpenIcon className="w-6 h-6 mr-2" />
        MyReads
      </button>

      <button
        onClick={() => onTabChange('online')}
        className={`
          px-4 py-2 rounded-md focus:outline-none 
          flex items-center
          ${activeTab === 'online' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}
        `}
      >
        <MagnifyingGlassCircleIcon className="w-6 h-6 mr-2" />
        Find a book
      </button>
    </div>
  );
}

export default SearchTabs;
