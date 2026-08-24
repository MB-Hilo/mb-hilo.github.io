'use client';

import { useState } from 'react';
import { Experience } from '@/types/resume';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/data/translations';

interface ExpandableExperienceProps {
  job: Experience;
  index: number;
}

export default function ExpandableExperience({ job, index }: ExpandableExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(index < 3); // Show first 3 expanded by default
  const { language } = useLanguage();
  const t = getTranslations(language);

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
                className="text-blue-600 underline hover:text-blue-800 inline-flex items-center gap-1"
              >
                {job.company}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7" />
                  <path d="M10 14L21 3" />
                  <path d="M21 14v7H3V3h7" />
                </svg>
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
            t.fewerItems(additionalAchievements.length) :
            t.moreItems(additionalAchievements.length)
          }
        </button>
      )}
    </article>
  );
}
