'use client';

import { useState } from 'react';

interface DetailedSkill {
  name: string;
  level: number;
  experience: string;
  details?: string[];
}

interface SkillMatrixProps {
  skills: DetailedSkill[];
}

export default function SkillMatrix({ skills }: SkillMatrixProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleSkill = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  const renderStars = (level: number) => {
    return (
      <div className="flex space-x-1 print:hidden">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={`w-3 h-3 ${
              star <= level 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
          >
            ★
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="skill-matrix">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 print:text-base">
        Technical Skills Matrix
      </h3>
      
      {/* Desktop/Interactive View */}
      <div className="hidden md:block print:hidden">
        <div className="grid grid-cols-1 gap-2">
          {skills.map((skill) => (
            <div key={skill.name} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSkill(skill.name)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{skill.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{skill.experience}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {renderStars(skill.level)}
                    <div className="text-sm text-gray-500">
                      {expandedSkill === skill.name ? '−' : '+'}
                    </div>
                  </div>
                </div>
              </button>
              
              {expandedSkill === skill.name && skill.details && (
                <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                  <ul className="space-y-1 text-sm text-gray-700">
                    {skill.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden print:hidden">
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-800 flex-1">{skill.name}</div>
                {renderStars(skill.level)}
              </div>
              <div className="text-sm text-gray-600">{skill.experience}</div>
              {skill.details && (
                <button
                  onClick={() => toggleSkill(skill.name)}
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  {expandedSkill === skill.name ? 'Show less' : 'Show details'}
                </button>
              )}
              {expandedSkill === skill.name && skill.details && (
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {skill.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Print View */}
      <div className="hidden print:block">
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="flex justify-between items-center py-1 border-b border-gray-200">
              <div className="flex-1">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-600 ml-2">({skill.experience})</span>
              </div>
              <div className="text-sm">
                {'★'.repeat(skill.level)}{'☆'.repeat(5 - skill.level)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}