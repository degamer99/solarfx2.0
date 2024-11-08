// components/InvestmentPlan.tsx
import React from 'react';

const InvestmentPlan: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-blue-700">150 % ROI</h2>
      <h3 className="text-xl font-semibold text-blue-700">Test</h3>
      <hr className="my-4" />
      <ul className="list-none text-left space-y-2 mb-6">
        <li>✓ Minimum amount: $500</li>
        <li>✓ Maximum amount: $2,999</li>
        <li>✓ 150% Every 10 Minutes for 5 Days</li>
        <li>✓ Charges Amount:</li>
        <li>✓ Duration: 5 Days</li>
      </ul>
      <div className="mb-4">
        <select className="w-full p-2 border rounded-md text-gray-700">
          <option>$ 500 - $ 2999</option>
        </select>
      </div>
      <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
        Join plan
      </button>
    </div>
  );
};

export default InvestmentPlan;
