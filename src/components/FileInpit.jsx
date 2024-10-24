import React, { useRef } from 'react';

const FileInput = ({ onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected and it is an image
    if (file && file.type.startsWith('image/')) {
      // Do something with the selected image file
      console.log(file)
      onFileChange(file);
    } else {
      // Handle non-image file selection (you can show an error message or perform other actions)
      console.error('Please select a valid image file.');
    }
  };

  return (
    <div className="my-4 flex items-center justify-center p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*" // Allow only image files
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-12 h-12 text-gray-500 mb-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={handleButtonClick}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default FileInput;
