import React, { useState } from 'react';

const CopyInput = ({ defaultValue }) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className=" w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
      />

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyInput;
