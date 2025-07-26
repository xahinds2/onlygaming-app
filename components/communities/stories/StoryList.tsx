// components/StoryList.tsx
import React from 'react';
import StoryItem from './StoryItem';

interface Story {
  id: string;
  image: string;
  user: string;
  viewed: boolean;
}

interface StoryListProps {
  stories: Story[];
  onStoryClick: (image: string, user: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <div className=' p-2 '>
      <div className=' gap-4 overflow-x-auto p-2 flex '>
      {stories.map((story, index) => (
        <StoryItem
          key={story.id}
          id={story.id}
          image={story.image}
          user={story.user}
          viewed={story.viewed}
          onClick={onStoryClick} // Pass onClick handler to StoryItem
        />
      ))}
      </div>
    </div>
  );
};

export default StoryList;
