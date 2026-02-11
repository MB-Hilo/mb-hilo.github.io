import { Language } from '@/context/LanguageContext';
import { ResumeData } from '@/types/resume';

import resumeEn from './resume.json';
import resumeDe from './resume.de.json';
import resumeFr from './resume.fr.json';
import resumeEs from './resume.es.json';

const resumeDataMap: Record<Language, ResumeData> = {
  en: resumeEn as ResumeData,
  de: resumeDe as ResumeData,
  fr: resumeFr as ResumeData,
  es: resumeEs as ResumeData,
};

export function getResumeData(language: Language): ResumeData {
  return resumeDataMap[language];
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
};
