// components/KYCVerification.tsx
"use client"
import React from 'react';
// import { FaFileAlt, FaEnvelope } from 'react-icons/fa';
import { File, Mail } from 'lucide-react';
import Link from 'next/link';

const KYCVerification: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto space-y-8 p-6">
            {/* KYC Verification Section */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-2 text-center">KYC Verification</h1>
                <p className="text-gray-600 text-center mb-6">
                    To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.
                </p>
                <div className="bg-gray-100 p-6 rounded-md text-center shadow-inner">
                    <File className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 mb-4">
                        You have not submitted your necessary documents to verify your identity. In order to enjoy our investment system, please verify your identity.
                    </p>
                    <Link href="/main/kyc">
                        <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
                            Click here to complete your KYC
                        </button>
                    </Link>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
                <Mail className="text-4xl text-gray-600 mr-4" />
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">We’re here to help you!</h2>
                    <p className="text-gray-600 text-sm">
                        Ask a question, manage requests, report an issue. Our support team will get back to you by email.
                    </p>
                </div>
                <Link href="/main/support">
                    <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                        Get Support Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default KYCVerification;
