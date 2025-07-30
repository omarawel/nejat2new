import React from 'react';

interface StoryCardProps {
  title: string;
  story: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, story }) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{story}</p>
    </div>
  );
};

export default StoryCard;