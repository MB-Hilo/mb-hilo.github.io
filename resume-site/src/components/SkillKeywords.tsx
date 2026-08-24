'use client';

import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/data/translations';

interface SkillKeywordsProps {
  keywords: string[];
}

export default function SkillKeywords({ keywords }: SkillKeywordsProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  if (!keywords?.length) return null;

  return (
    <section className="mb-8">
      <h2 className="sidebar-title text-lg font-semibold mb-4 text-gray-800 print:text-base">
        {t.technicalSkillsList}
      </h2>

      {/* Screen: keyword chips */}
      <div className="flex flex-wrap gap-1.5 print:hidden">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs"
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* Print: comma-separated run, matching the paper resume */}
      <p className="hidden print:block text-xs text-gray-800 leading-relaxed">
        {keywords.join(', ')}
      </p>
    </section>
  );
}
