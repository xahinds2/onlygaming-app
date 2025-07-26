// components/StoryItem.tsx
'use client'
import React from 'react';

interface StoryItemProps {
  id: string;
  image: string;
  user: string;
  viewed: boolean;
  onClick: (image: string, user: string) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ id, image, user, viewed, onClick }) => {
  return (
    <div
      className={`w-16 h-16  rounded-full border-2 ${viewed ? 'border-gray-300' : 'border-red-500'}`}
      onClick={() => onClick(image, user)} // Call onClick handler with image and user data
    >
      <img src={image} alt={user} className="rounded-full w-full h-full object-cover cursor-pointer" />
    </div>
  );
};

export default StoryItem;
