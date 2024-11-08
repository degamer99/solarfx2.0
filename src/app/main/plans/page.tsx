"use client"

// components/SignalCard.tsx
import React from 'react';

const SignalCard: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto p-4 bg-gray-100 border rounded-lg shadow-lg text-center">
      You don&apos;t have an investment plan at the moment or no value match your query
      <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
        Buy Now
      </button>
    </div>
  );
};

export default SignalCard;
