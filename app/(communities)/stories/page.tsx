// pages/index.tsx
'use client'
import React, { useState, useEffect } from 'react';
import StoryList from '@/components/communities/stories/StoryList';
import StoryViewer from '@/components/communities/stories/StoryViewer';

const Home: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<{ image: string; user: string } | null>(null);
  const [maxVisibleStories, setMaxVisibleStories] = useState(0);


  // Function to handle click event on a story item
  const handleStoryClick = (image: string, user: string) => {
    setSelectedStory({ image, user });
  };

  // Dummy data for stories
  const stories = [
    { id: '1', image: '/assets/home/Home1.webp', user: 'User1', viewed: false },
    { id: '2', image: '/assets/home/Home2.png', user: 'User2', viewed: true },
    { id: '3', image: '/assets/home/Home3.png', user: 'User3', viewed: false },
    { id: '4', image: '/assets/home/Home1.webp', user: 'User1', viewed: false },
    { id: '5', image: '/assets/home/Home2.png', user: 'User2', viewed: true },
    { id: '6', image: '/assets/home/Home3.png', user: 'User3', viewed: false }, { id: '1', image: '/assets/home/Home1.webp', user: 'User1', viewed: false },
    { id: '7', image: '/assets/home/Home2.png', user: 'User2', viewed: true },

  ];

  // Define maxVisibleStories for different screen sizes
  useEffect(() => {
    // Determine maxVisibleStories based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMaxVisibleStories(3);
      } else if (width < 1024) {
        setMaxVisibleStories(5);
      } else {
        setMaxVisibleStories(7);
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className=" p-2">
      <StoryList
        stories={stories}
        onStoryClick={handleStoryClick}

      />
      {selectedStory && <StoryViewer {...selectedStory} />}
    </div>
  );
};

export default Home;
