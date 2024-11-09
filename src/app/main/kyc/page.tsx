// components/IDVerificationForm.tsx
"use client"
import { Input } from '@/components/ui/input';
import React from 'react';

const IDVerificationForm: React.FC = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Begin your ID-Verification</h1>
        <p className="text-center text-gray-600 mb-8">
          To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.
        </p>

        <form>
          {/* Personal Details */}
          <fieldset className="mb-6">
            <legend className="font-semibold text-lg mb-2">Personal Details</legend>
            <p className="text-sm text-gray-500 mb-4">
              Your simple personal information required for identification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name='first' type='text' label='First Name' placeholder='First Name' required />
              <Input name='last' type='text' label='Last Name' placeholder='Last Name' required />
              <Input name='email' type='email' label='Email Address' placeholder='Email Address' required />
              <Input name='phone' type='tel' label='Phone Number' placeholder='Phone Number' required />
              <Input name='date' type='date' label='Date of Birth' placeholder='Phone Number' required />
              <Input name='social' type='text' label='Twitter or Facebook Username' placeholder='Twitter or Facebook Username' required />
              {/* <input type="text" placeholder="First name" required className="p-2 border rounded-md" /> */}
              {/* <input type="text" placeholder="Last name" required className="p-2 border rounded-md" />
            <input type="email" placeholder="Email" required className="p-2 border rounded-md" /> */}
              {/* <input type="tel" placeholder="Phone Number" required className="p-2 border rounded-md" /> */}
              {/* <input type="date" placeholder="Date of birth" required className="p-2 border rounded-md" /> */}
              {/* <input type="text" placeholder="Twitter or Facebook username" className="p-2 border rounded-md" /> */}
            </div>
          </fieldset>

          {/* Address Details */}
          <fieldset className="mb-6">
            <legend className="font-semibold text-lg mb-2">Your Address</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Address line" required className="p-2 border rounded-md" />
              <input type="text" placeholder="City" required className="p-2 border rounded-md" />
              <input type="text" placeholder="State" required className="p-2 border rounded-md" />
              <input type="text" placeholder="Nationality" required className="p-2 border rounded-md" />
            </div>
          </fieldset>

          {/* Document Upload */}
          <fieldset className="mb-6">
            <legend className="font-semibold text-lg mb-2">Document Upload</legend>
            <p className="text-sm text-gray-500 mb-4">
              Your simple personal document required for identification.
            </p>
            <div className="flex space-x-4 mb-4">
              <button type="button" className="bg-blue-700 text-white px-4 py-2 rounded-md">ID/Passport</button>
              <button type="button" className="bg-blue-700 text-white px-4 py-2 rounded-md">National ID</button>
              <button type="button" className="bg-blue-700 text-white px-4 py-2 rounded-md">Driver&apos;s License</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              To avoid delays when verifying your account, please make sure your document meets the criteria below:
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Document should not be expired.</li>
                <li>Chosen document should match the provided details.</li>
                <li>Document must be in good condition and clearly visible.</li>
                <li>Make sure there is no light glare on the document.</li>
              </ul>
            </p>
            <label className="block mb-2">Upload front side*</label>
            <input type="file" className="block w-full p-2 border rounded-md mb-4" />
            <label className="block mb-2">Upload back side*</label>
            <input type="file" className="block w-full p-2 border rounded-md" />
          </fieldset>

          {/* Checkbox and Submit */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" required className="form-checkbox text-blue-700" />
              <span className="ml-2 text-gray-700">All the information I have entered is correct.</span>
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default IDVerificationForm;
