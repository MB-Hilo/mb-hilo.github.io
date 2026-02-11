import { Language } from '@/context/LanguageContext';

export interface UITranslations {
  // Section headers
  contact: string;
  profile: string;
  workExperience: string;
  skills: string;
  softSkills: string;
  technicalSkillsMatrix: string;
  education: string;
  sideProjects: string;
  languages: string;
  interests: string;
  experience: string;

  // Labels
  nationality: string;
  residence: string;
  years: string;

  // Buttons/Actions
  clickToRevealEmail: string;
  showMore: string;
  showLess: string;
  showDetails: string;
  viewOnGitHub: string;
  viewOnKaggle: string;

  // Dynamic text patterns
  moreItems: (count: number) => string;
  fewerItems: (count: number) => string;

  // Project descriptions
  roboLogDescription: string;
  shunidoDescription: string;
}

const translations: Record<Language, UITranslations> = {
  en: {
    contact: 'Contact',
    profile: 'Profile',
    workExperience: 'Work Experience',
    skills: 'Skills',
    softSkills: 'Soft Skills',
    technicalSkillsMatrix: 'Technical Skills Matrix',
    education: 'Education',
    sideProjects: 'Side Projects',
    languages: 'Languages',
    interests: 'Interests',
    experience: 'Experience',
    nationality: 'Nationality',
    residence: 'Residence',
    years: 'years',
    clickToRevealEmail: 'Click to reveal email',
    showMore: 'Show more',
    showLess: 'Show less',
    showDetails: 'Show details',
    viewOnGitHub: 'View on GitHub',
    viewOnKaggle: 'View on Kaggle',
    moreItems: (count) => `+ Show more (${count} more items)`,
    fewerItems: (count) => `− Show less (${count} fewer items)`,
    roboLogDescription: 'AI-powered log monitoring system',
    shunidoDescription: 'Virtual fashion exploration platform',
  },
  de: {
    contact: 'Kontakt',
    profile: 'Profil',
    workExperience: 'Berufserfahrung',
    skills: 'Fähigkeiten',
    softSkills: 'Soft Skills',
    technicalSkillsMatrix: 'Technische Fähigkeiten',
    education: 'Ausbildung',
    sideProjects: 'Nebenprojekte',
    languages: 'Sprachen',
    interests: 'Interessen',
    experience: 'Erfahrung',
    nationality: 'Nationalität',
    residence: 'Wohnsitz',
    years: 'Jahre',
    clickToRevealEmail: 'Klicken Sie, um E-Mail anzuzeigen',
    showMore: 'Mehr anzeigen',
    showLess: 'Weniger anzeigen',
    showDetails: 'Details anzeigen',
    viewOnGitHub: 'Auf GitHub ansehen',
    viewOnKaggle: 'Auf Kaggle ansehen',
    moreItems: (count) => `+ Mehr anzeigen (${count} weitere Einträge)`,
    fewerItems: (count) => `− Weniger anzeigen (${count} weniger Einträge)`,
    roboLogDescription: 'KI-gestütztes Log-Überwachungssystem',
    shunidoDescription: 'Virtuelle Mode-Erkundungsplattform',
  },
  fr: {
    contact: 'Contact',
    profile: 'Profil',
    workExperience: 'Expérience Professionnelle',
    skills: 'Compétences',
    softSkills: 'Compétences Relationnelles',
    technicalSkillsMatrix: 'Matrice des Compétences Techniques',
    education: 'Formation',
    sideProjects: 'Projets Personnels',
    languages: 'Langues',
    interests: 'Centres d\'Intérêt',
    experience: 'Expérience',
    nationality: 'Nationalité',
    residence: 'Résidence',
    years: 'ans',
    clickToRevealEmail: 'Cliquez pour révéler l\'email',
    showMore: 'Voir plus',
    showLess: 'Voir moins',
    showDetails: 'Voir les détails',
    viewOnGitHub: 'Voir sur GitHub',
    viewOnKaggle: 'Voir sur Kaggle',
    moreItems: (count) => `+ Voir plus (${count} éléments de plus)`,
    fewerItems: (count) => `− Voir moins (${count} éléments de moins)`,
    roboLogDescription: 'Système de surveillance des logs alimenté par l\'IA',
    shunidoDescription: 'Plateforme d\'exploration de mode virtuelle',
  },
  es: {
    contact: 'Contacto',
    profile: 'Perfil',
    workExperience: 'Experiencia Laboral',
    skills: 'Habilidades',
    softSkills: 'Habilidades Blandas',
    technicalSkillsMatrix: 'Matriz de Habilidades Técnicas',
    education: 'Educación',
    sideProjects: 'Proyectos Personales',
    languages: 'Idiomas',
    interests: 'Intereses',
    experience: 'Experiencia',
    nationality: 'Nacionalidad',
    residence: 'Residencia',
    years: 'años',
    clickToRevealEmail: 'Haga clic para revelar el correo',
    showMore: 'Mostrar más',
    showLess: 'Mostrar menos',
    showDetails: 'Ver detalles',
    viewOnGitHub: 'Ver en GitHub',
    viewOnKaggle: 'Ver en Kaggle',
    moreItems: (count) => `+ Mostrar más (${count} elementos más)`,
    fewerItems: (count) => `− Mostrar menos (${count} elementos menos)`,
    roboLogDescription: 'Sistema de monitoreo de logs impulsado por IA',
    shunidoDescription: 'Plataforma de exploración de moda virtual',
  },
};

export function getTranslations(language: Language): UITranslations {
  return translations[language];
}
