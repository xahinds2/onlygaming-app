// components/StoryViewer.tsx
'use client'
import React from 'react';

interface StoryViewerProps {
  image: string;
  user: string;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ image, user }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 bg-white rounded-lg shadow-lg">
        <img src={image} alt={user} className="rounded-lg w-full" />
        <div className="text-lg font-bold mt-2">{user}</div>
        {/* Add reactions UI here */}
      </div>
    </div>
  );
};

export default StoryViewer;
