// components/AddFund.tsx
import React from 'react';

const AddFund = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="text-xl font-bold mb-4">Add Fund(USDT)</div>
      <div className="p-4 bg-white border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
            <span className="text-xl">$</span>
          </div>
          <p className="ml-4">Make Payment of <span className="font-semibold">2000$</span> to the address below and click &quot; SEND PROOF OF DEPOSIT&quot;</p>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="w-40 h-40 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded-md flex items-center justify-center">
            {/* Placeholder for the QR code */}
            {/* <img src="/path/to/qr-code.png" alt="QR Code" className="h-full w-full object-contain" /> */}
          </div>

          <div className="flex-1">
            <input
              type="text"
              readOnly
              value="TTF5ZaFCHNMMg81PuXjGiim9W6oGAYcLuH"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none mb-2"
            />
            <button className="bg-gray-300 text-sm px-4 py-1 rounded-md">Copy</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Upload Proof of Deposit:</label>
          <input type="file" className="block w-full border border-gray-300 rounded-md p-1.5" />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700">
          SEND PROOF OF DEPOSIT
        </button>
      </div>

      <footer className="mt-6 text-center text-sm text-gray-500">
        Copyright © Solutionfxtrade Investment Company offers a simple and transparent mechanism for attracting investments and making profits.
      </footer>
    </div>
  );
};

export default AddFund;
