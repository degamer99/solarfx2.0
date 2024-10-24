"use client"

import Link from "next/link";
import { Button } from "./ui/button";

// components/CardLayout.js
export default function CardLayout() {
    const cardData = [
      {
        title: 'Learn',
        description: [
          'FREE Demo Account',
          'Step-by-step tutorials & articles',
          'Online webinars & local seminars',
          'Your own Account Manager',
        ],
        button: 'Create an account',
        color: 'green-500',
      },
      {
        title: 'Trade',
        description: [
          'Tight spreads',
          'Superfast trade execution',
          'Hi-tech forex trading tools',
          'Ultimate risk protection & security',
        ],
        button: 'Create an account',
        color: 'blue-500',
      },
      {
        title: 'Invest',
        description: [
          'No need to be an experienced trader',
          'Large number of strategies to follow',
          'Profit whenever Strategy Managers earn',
          'Full control of your Investment',
        ],
        button: 'Create an account',
        color: 'red-500',
      },
    ];
  
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-6 w-full md:w-1/3"
            >
              {/* Title */}
              <div className="flex items-center mb-4 place-self-center">
                <div
                  className={`h-4 w-4 rounded-full bg-${card.color} mr-2`}
                ></div>
                <h2 className="text-2xl font-semibold">{card.title}</h2>
              </div>
  
              {/* Description List */}
              <ul className="text-gray-700 mb-6 space-y-2 text-sm">
                {card.description.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
  
              {/* Button */}
              <Link href="/signin" className="place-self-center">
              <Button className="mx-auto">
                {card.button}
              </Button>
              </Link>
              {/* <button className="mx-auto px-4 py-2 border-2 border-yellow-600 text-yellow-600 rounded hover:bg-yellow-600 hover:text-white transition duration-300">
              </button> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  