"use client"
// components/ExpertCard.tsx
import React from 'react';
import { Star, User } from 'lucide-react';
import Image from 'next/image';

interface ExpertCardProps {
  name: string;
  followers: number;
  capital: number;
  profitPercentage: number;
  totalProfit: number
  rating: number;
  image: string
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  followers,
  capital,
  profitPercentage,
  totalProfit,
  rating, image
}) => {
  console.log(image)
  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-4">
      <div className="flex  flex-col justify-between items-center gap-1 mb-4">
        <span className="place-self-start text-sm font-bold bg-yellow-500 text-white px-2 py-1 rounded-md">PRO</span>
        {/* Replace the placeholder image URL with the appropriate source */}
        <div className='border rounded-full'>
            <Image 
                src={image}
                alt={`${name}`} 
                width={50}
                height={50}
                className="w-16 h-16 rounded-full"
            />
        </div>
        <h2 className="text-center font-semibold text-xl mb-2">{name}</h2>
      </div>
      <hr className="border-t-2 border-blue-600 mb-4" />
      <ul className="text-gray-700 space-y-1">
        <li><strong>Followers:</strong> {followers.toLocaleString()}</li>
        <li><strong>Minimum Start Up Capital:</strong> 
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(capital)}
        </li>
        <li><strong>Percentage Profit:</strong> {profitPercentage}%</li>
        <li><strong>Total Profit:</strong> 
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalProfit)}
        </li>
      </ul>
      <div className="flex items-center my-2">
        <strong className="mr-2">Rating:</strong>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
        Copy Expert
      </button>
    </div>
  );
};

export default ExpertCard;
