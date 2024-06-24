import React from "react";

const BookmarkMenu = () => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-md w-72">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v16l7-5 7 5V3z"
            ></path>
          </svg>
          <span>Bookmark</span>
        </div>
        <button className="text-gray-500 hover:text-white">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-gray-300 text-black p-2 rounded-md flex flex-col items-center">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v16l7-5 7 5V3z"
            ></path>
          </svg>
          <span className="text-xs">Quick Bookmark Folder</span>
        </button>
        <button className="bg-gray-300 text-black p-2 rounded-md flex flex-col items-center">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M19.428 15.5L16.5 12.571M7 7h.01M6.125 15.5l2.928-2.929M7 7h.01M7 7h.01M16.5 12.571L12 8m0 0l4.5 4.5m0 0L12 16"
            ></path>
          </svg>
          <span className="text-xs">Add to Folder</span>
        </button>
        <button className="bg-gray-300 text-black p-2 rounded-md flex flex-col items-center">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M19.428 15.5L16.5 12.571M7 7h.01M6.125 15.5l2.928-2.929M7 7h.01M7 7h.01M16.5 12.571L12 8m0 0l4.5 4.5m0 0L12 16"
            ></path>
          </svg>
          <span className="text-xs">Create Folder</span>
        </button>
      </div>
    </div>
  );
};

export default BookmarkMenu;
