"use client"
// components/SupportForm.tsx
import React from 'react';
import Header from '@/components/Header';
import Ticker from '@/components/ui/ticker';

const SupportForm: React.FC = () => {
  return (
    <div>
        <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-2">Solarfx Support</h1>
        <p className="text-lg mb-4">For inquiries, suggestions or complaints. Mail us</p>
        <a href="mailto:support@solutionfxtrade.com" className="text-blue-700 underline mb-6 block">
            support@solutionfxtrade.com
        </a>
        
        <form className="text-left">
            {/* Message Label and Textarea */}
            <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-1">
                Message<span className="text-red-600">*</span>
            </label>
            <textarea
                id="message"
                placeholder="Type your message here"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={6}
            ></textarea>
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
            Send
            </button>
        </form>
        </div>

    </div>
  );
};

export default SupportForm;
