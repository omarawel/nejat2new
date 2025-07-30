// This is a server component

import StoryCard from '@/components/StoryCard';

const IslamicStories = () => {
  const stories = [
    {
      title: 'The Companions of the Cave (Ashab al-Kahf)',
      story: `A group of young men fled from a tyrannical king who wanted to force them into idolatry and sought refuge in a cave. Allah put them into a deep sleep that lasted for over 300 years. When they woke up, society had converted to monotheism. Their story, told in Surah Al-Kahf, is a sign of Allah's power to protect the believers and a proof of the resurrection.`,
    },
    {
      title: 'The Story of Qarun',
      story: `Qarun was a wealthy man from the time of Prophet Musa (Moses). His immense wealth made him arrogant and ungrateful to Allah. Despite warnings, he refused to pay zakat (charity) and boasted that his wealth was due to his own knowledge and effort. As a result, Allah caused the earth to swallow him and his wealth. This story, mentioned in Surah Al-Qasas, is a reminder that wealth is a test and true success is achieved through gratitude and obedience to Allah.`,
    },
    {
      title: 'The Story of Prophet Yunus (Jonah) and the Whale',
      story: `Prophet Yunus was sent to the people of Nineveh, but they rejected his message. In his frustration, he left the city without Allah's permission. He boarded a ship, and when a storm arose, he was cast into the sea and swallowed by a whale. In the belly of the whale, Yunus repented and glorified Allah. Allah then commanded the whale to release him. He returned to Nineveh, and this time, the people accepted his message. This story, found in Surah Yunus and Surah Al-Anbiya, highlights the importance of patience, repentance, and Allah's mercy.`,
    },
    {
      title: 'The Story of Prophet Ayub (Job) and His Patience',
      story: `Prophet Ayub was a wealthy and righteous man who was tested with the loss of his wealth, health, and family. Despite his immense suffering, he remained patient and never complained to Allah. His wife remained loyal and supported him through his trials. After years of hardship, Allah restored his health, wealth, and family, doubling what he had lost. This story, primarily found in Surah Ayub, is a profound example of patience, perseverance, and unwavering faith in the face of adversity.`,
    },
    {
      title: 'The Story of the Year of the Elephant (Am al-Fil)',
      story: `Before the birth of Prophet Muhammad (peace be upon him), a king named Abraha, the ruler of Yemen, marched with a large army, including elephants, to destroy the Kaaba in Mecca. As his army approached, flocks of birds appeared, carrying stones in their beaks and claws. The birds pelted Abraha's army with these stones, destroying them. This event, mentioned in Surah Al-Fil, was a sign of Allah's protection of the Kaaba and a precursor to the arrival of the final Prophet.`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Islamic Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <StoryCard key={index} title={story.title} story={story.story} />
        ))}
      </div>
    </div>
  );
};

export default IslamicStories;
