'use client';

import { useState, useEffect } from 'react';
import { PersonalInfo, Skills } from '@/types/resume';
import SkillMatrix from './SkillMatrix';
import SkillChart from './SkillChart';
import QRCode from './QRCode';

interface SidebarProps {
  personalInfo: PersonalInfo;
  skills: Skills;
  languages: string[];
  hobbies: string[];
}

export default function Sidebar({ personalInfo, skills, languages, hobbies }: SidebarProps) {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [locale, setLocale] = useState<'portugal' | 'north-america'>('portugal');
  const [isLocalhost, setIsLocalhost] = useState(false);

  // Check if running on localhost
  useEffect(() => {
    setIsLocalhost(
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    );
  }, []);

  // Override contact info based on locale
  const contactInfo = locale === 'north-america' ? {
    ...personalInfo.contact,
    location: 'Ontario, Canada',
    phone: '+1-437-889-8690',
    'residence visa': undefined,
  } : personalInfo.contact;

  return (
    <aside className="sidebar bg-slate-100 p-6 print:bg-white print:p-4">
      {isLocalhost && (
        <div className="mb-4 print:hidden">
          <div className="flex gap-2 bg-yellow-100 p-2 rounded">
            <button
              onClick={() => setLocale('portugal')}
              className={`flex-1 px-3 py-1 text-xs rounded ${
                locale === 'portugal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Portugal/EU
            </button>
            <button
              onClick={() => setLocale('north-america')}
              className={`flex-1 px-3 py-1 text-xs rounded ${
                locale === 'north-america'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              North America
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center mb-6">
        <QRCode text={contactInfo.linkedin} size={64} />
      </div>
      <div className="hidden print:hidden avatar bg-blue-600 text-white w-12 h-12 rounded-full justify-center items-center text-lg font-bold mb-6">
        MB
      </div>

      <section className="mb-8">
        <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800">Contact</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            {!emailRevealed ? (
              <button
                onClick={() => setEmailRevealed(true)}
                className="text-blue-600 hover:underline print:hidden"
              >
                Click to reveal email
              </button>
            ) : (
              <span>{contactInfo.email}</span>
            )}
            <span className="hidden print:inline">{contactInfo.email}</span>
          </li>
          {isLocalhost && (
            <>
              <li>
                {!phoneRevealed ? (
                  <button
                    onClick={() => setPhoneRevealed(true)}
                    className="text-blue-600 hover:underline print:hidden"
                  >
                    Click to reveal phone
                  </button>
                ) : (
                  <span>{contactInfo.phone}</span>
                )}
                <span className="hidden print:inline">{contactInfo.phone}</span>
              </li>
              <li>{contactInfo.location}</li>
            </>
          )}
          {contactInfo.nationality && (
            <li>Nationality: {contactInfo.nationality}</li>
          )}
          {isLocalhost && contactInfo['residence visa'] && (
            <li>Residence: {contactInfo['residence visa']}</li>
          )}
          <li>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener"
              className="text-blue-600 hover:underline print:text-black"
            >
              linkedin.com/in/markobradley
            </a>
          </li>
          {contactInfo.website && (
            <li>
              <a
                href={contactInfo.website}
                target="_blank"
                rel="noopener"
                className="text-blue-600 hover:underline print:text-black"
              >
                mb-hilo.github.io
              </a>
            </li>
          )}
          {contactInfo.consulting && (
            <li>
              <a
                href={contactInfo.consulting}
                target="_blank"
                rel="noopener"
                className="text-blue-600 hover:underline print:text-black"
              >
                hilo.ca (consulting)
              </a>
            </li>
          )}
        </ul>
      </section>

      <SkillChart />

      <section className="mb-8">
        <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800">Skills</h2>
        <ul className="space-y-3">
          {skills.technical.map((skill) => (
            <li key={skill.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 flex-1">{skill.name}</span>
              <span className="text-xs text-gray-600">{Math.floor(skill.level / 10)} years</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800">Soft Skills</h2>
        <ul className="space-y-2">
          {skills.soft.map((skill) => (
            <li key={skill.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{skill.name}</span>
              <div className="flex space-x-1 print:hidden">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full ${
                      dot <= skill.level ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="hidden print:inline text-sm">{skill.level}/5</span>
            </li>
          ))}
        </ul>
      </section>

        <section className="mb-8 print:hidden">
            <SkillMatrix skills={skills.detailedTechnical} />
        </section>

      <section className="mb-8 print:break-before-page">
        <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800">Side Projects</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">RoboLog</h3>
            <p className="text-xs text-gray-600 mb-2">AI-powered log monitoring system</p>
            <div className="space-y-1">
              <a 
                href="https://github.com/Hilo-Inc/robolog"
                target="_blank"
                rel="noopener"
                className="text-blue-600 hover:underline text-xs print:text-black block"
              >
                View on GitHub →
              </a>
              <a 
                href="https://www.kaggle.com/competitions/google-gemma-3n-hackathon/writeups/robolog-ai-powered-log-monitoring-system"
                target="_blank"
                rel="noopener"
                className="text-blue-600 hover:underline text-xs print:text-black block"
              >
                View on Kaggle →
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Shunido</h3>
            <p className="text-xs text-gray-600 mb-2">Virtual fashion exploration platform</p>
            <a 
              href="https://www.kaggle.com/competitions/banana/writeups/shunido-virtual-fashion-exploration"
              target="_blank"
              rel="noopener"
              className="text-blue-600 hover:underline text-xs print:text-black"
            >
              View on Kaggle →
            </a>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800">Languages</h2>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <span
              key={language}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs print:bg-gray-100 print:text-gray-800"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800">Interests</h2>
        <div className="grid grid-cols-1 gap-2">
          {hobbies.map((hobby) => (
            <span
              key={hobby}
              className="text-sm text-gray-700 flex items-center print:text-xs"
            >
              {hobby}
            </span>
          ))}
        </div>
      </section>


    </aside>
  );
}
