import { useLanguage } from '@/context/LanguageContext';
import { getTranslations, UITranslations } from '@/data/translations';
import { getResumeData } from '@/data/resumeData';
import { ResumeData } from '@/types/resume';

interface UseTranslationsReturn {
  t: UITranslations;
  data: ResumeData;
}

export function useTranslations(): UseTranslationsReturn {
  const { language } = useLanguage();

  return {
    t: getTranslations(language),
    data: getResumeData(language),
  };
}
