'use client';

import { useState } from 'react';
import { Experience } from '@/types/resume';

interface ExpandableExperienceProps {
  job: Experience;
  index: number;
}

export default function ExpandableExperience({ job, index }: ExpandableExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(index < 3); // Show first 3 expanded by default

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Split achievements into core (first 3) and additional
  const coreAchievements = job.achievements.slice(0, 3);
  const additionalAchievements = job.achievements.slice(3);
  const hasAdditionalContent = additionalAchievements.length > 0;

  return (
    <article className="job mb-6 print:mb-4 print:break-inside-avoid">
      <div className="job-head flex justify-between items-start mb-3 print:mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 print:text-base">
            {job.title} — {job.website ? (
              <a 
                href={job.website} 
                target="_blank" 
                rel="noopener" 
                className="text-blue-600 hover:underline print:text-black"
              >
                {job.company}
              </a>
            ) : (
              job.company
            )}
          </h3>
          {job.location && (
            <p className="text-sm text-gray-600 print:text-xs">{job.location}</p>
          )}
        </div>
        <span className="date text-gray-600 text-sm whitespace-nowrap ml-4 print:text-xs">
          {job.period}
        </span>
      </div>

      <ul className="space-y-2 text-gray-700 print:text-sm">
        {coreAchievements.map((achievement, achievementIndex) => (
          <li key={achievementIndex} className="leading-relaxed">
            • {achievement}
          </li>
        ))}
        
        {isExpanded && additionalAchievements.map((achievement, achievementIndex) => (
          <li key={`additional-${achievementIndex}`} className="leading-relaxed">
            • {achievement}
          </li>
        ))}
      </ul>

      {hasAdditionalContent && (
        <button
          onClick={toggleExpanded}
          className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium print:hidden focus:outline-none"
        >
          {isExpanded ? 
            `− Show less (${additionalAchievements.length} fewer items)` : 
            `+ Show more (${additionalAchievements.length} more items)`
          }
        </button>
      )}
    </article>
  );
}