'use client';

import { PersonalInfo, Experience } from '@/types/resume';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/data/translations';
import ExpandableExperience from './ExpandableExperience';

interface MainContentProps {
  personalInfo: PersonalInfo;
  profile: string;
  experience: Experience[];
  additionalExperience: string;
}

export default function MainContent({
  personalInfo,
  profile,
  experience,
  additionalExperience
}: MainContentProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <main className="main flex-1 p-6 print:p-4">
      <header className="header mb-8 print:mb-6">
        <h1 className="text-4xl font-bold text-gray-900 print:text-3xl">{personalInfo.name}</h1>
        <div className="subtitle text-xl text-gray-600 mt-2 print:text-lg">{personalInfo.title}</div>
        <div className="rule border-b-2 border-gray-300 w-full mt-4"></div>
      </header>

      <section className="section profile-section mb-8 print:mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 print:text-xl">{t.profile}</h2>
        <p className="text-gray-700 leading-relaxed print:text-sm">{profile}</p>
      </section>

      <section className="section experience-section main-content-flow mb-8 print:mb-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 print:text-xl">{t.workExperience}</h2>

        {experience.map((job, index) => (
          <ExpandableExperience key={index} job={job} index={index} />
        ))}

        <p className="more text-gray-600 italic print:text-sm mt-4">{additionalExperience}</p>
      </section>
    </main>
  );
}
