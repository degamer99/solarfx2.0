// components/LoanRequestForm.tsx
"use client"
import React from 'react';

const LoanRequestForm: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Loan Request Application</h1>
      
      <form className="space-y-4">
        {/* Loan Amount Input */}
        <div>
          <label htmlFor="loanAmount" className="block font-medium mb-1">Loan Amount (USD)</label>
          <input
            type="text"
            id="loanAmount"
            placeholder="Amount ($)"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        
        </div>
        {/* Credit Facility Select */}
        <div>
          <label htmlFor="creditFacility" className="block font-medium mb-1">Credit Facility</label>
          <select
            id="creditFacility"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>Select Loan/Credit Facility</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
        {/* Duration Select */}
        <div>
          <label htmlFor="duration" className="block font-medium mb-1">Duration (Months)</label>
          <select
            id="duration"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>6 Months</option>
            <option>12 Months</option>
            <option>18 Months</option>
            <option>24 Months</option>
            {/* Add more duration options as needed */}
          </select>
        </div>
        
        {/* Purpose of Loan Textarea */}
        <div>
          <label htmlFor="purpose" className="block font-medium mb-1">Purpose of Loan</label>
          <textarea
            id="purpose"
            placeholder="Purpose for loan"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={3}
          ></textarea>
        </div>
        
        {/* Monthly Net Income Select */}
        <div>
          <label htmlFor="income" className="block font-medium mb-1">Monthly Net Income</label>
          <select
            id="income"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>$2,000 - $5,000</option>
            <option>$5,001 - $10,000</option>
            <option>$10,001 - $15,000</option>
            {/* Add more income range options as needed */}
          </select>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default LoanRequestForm;
