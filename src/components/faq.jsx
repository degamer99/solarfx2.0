// FAQSection.js

import React, { useState } from 'react';
// import 

const FAQSection = () => {
  // const faqData = [
  //   {
  //     question: 'What is Forex trading?',
  //     answer: 'Forex, or foreign exchange, is the global marketplace for buying and selling currencies. It is the largest and most liquid financial market in the world.',
  //   },
  //   {
  //     question: 'How do I choose a reliable forex broker?',
  //     answer: 'Look for brokers with a good reputation, proper regulation, competitive fees, and a user-friendly trading platform.',
  //   },
  //   // Add more FAQ items as needed
  // ];

  const faqData = [
    {
      question: 'What is Forex trading?',
      answer: 'Forex, or foreign exchange, is the global marketplace for buying and selling currencies. It is the largest and most liquid financial market in the world.',
    },
    {
      question: 'How do I choose a reliable forex broker?',
      answer: 'Look for brokers with a good reputation, proper regulation, competitive fees, and a user-friendly trading platform.',
    },
    {
      question: 'What are the major currency pairs?',
      answer: 'Major currency pairs in Forex include EUR/USD, USD/JPY, GBP/USD, and USD/CHF, among others.',
    },
    {
      question: 'Can I trade cryptocurrencies on a forex platform?',
      answer: 'Some forex brokers offer cryptocurrency trading, allowing you to trade popular digital currencies like Bitcoin, Ethereum, and Litecoin.',
    },
    {
      question: 'How does leverage work in forex trading?',
      answer: 'Leverage allows traders to control a larger position size with a smaller amount of capital. While it magnifies potential profits, it also increases the risk of losses.',
    },
    {
      question: 'What is blockchain technology?',
      answer: 'Blockchain is a decentralized and distributed ledger technology that underlies cryptocurrencies. It ensures secure, transparent, and tamper-resistant record-keeping.',
    },
    {
      question: 'What is the difference between a market order and a limit order?',
      answer: 'A market order is an instruction to buy or sell a security immediately at the current market price. A limit order allows traders to specify the maximum price (for a buy order) or minimum price (for a sell order) at which they are willing to execute the trade.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16" id='faq'>
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>

        <div className="grid gap-6 max-w-lg mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="border p-4 rounded-md cursor-pointer bg-gray-50" onClick={() => toggleAnswer(index)}>
              <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
              {openIndex === index && <p className="text-gray-700">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
