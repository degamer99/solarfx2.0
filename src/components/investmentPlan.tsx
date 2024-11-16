import React from 'react';

interface InvestmentPlanProps {
  title: string;
  subtitle: string;
  details: string[];
  options: string[];
}

const InvestmentPlan: React.FC<InvestmentPlanProps> = ({
  title,
  subtitle,
  details,
  options,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
      <h3 className="text-xl font-semibold text-blue-700">{subtitle}</h3>
      <hr className="my-4" />
      <ul className="list-none text-left space-y-2 mb-6">
        {details.map((detail, index) => (
          <li key={index}>✓ {detail}</li>
        ))}
      </ul>
      <div className="mb-4">
        <select className="w-full p-2 border rounded-md text-gray-700">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>
      <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
        Join plan
      </button>
    </div>
  );
};

export default InvestmentPlan;
