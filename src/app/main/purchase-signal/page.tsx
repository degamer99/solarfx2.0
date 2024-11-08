"use client"

import Header from '@/components/Header';
import Ticker from '@/components/ui/ticker';
// components/SignalCard.tsx
import React from 'react';

const SignalCard: React.FC = () => {
  return (
    <div className='w-full'>
        <Header />
        <Ticker />
    <div className="max-w-sm mx-auto  my-4 p-4 bg-gray-100 border rounded-lg shadow-lg text-center h-fit">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Breakout Signals</h2>
      <div className="py-2 border-t border-b">
        <p className="text-lg font-medium">Signal Price: <span className="font-bold">$ 3000</span></p>
      </div>
      <div className="py-2 border-b">
        <p className="text-lg">Percentage: <span className="font-bold">68.7%</span></p>
      </div>
      <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
        Subscribe Now
      </button>
    </div>
    </div>
  );
};

export default SignalCard;
