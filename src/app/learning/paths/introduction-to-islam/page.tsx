// src/app/learning/paths/introduction-to-islam/page.tsx

import React from 'react';
import Link from 'next/link';

const IntroductionToIslamPath = () => {
  return (
    <div>
      <h1>Introduction to Islam Learning Path</h1>
      <p>This is the starting point for the Introduction to Islam learning path.</p>
      <h2>Lessons:</h2>
      <ul>
        <li>
          <Link href="/learning/paths/introduction-to-islam/lessons/what-is-islam">
            What is Islam?
          </Link>
        </li>
        {/* Add more lessons here */}
      </ul>
    </div>
  );
};

export default IntroductionToIslamPath;
