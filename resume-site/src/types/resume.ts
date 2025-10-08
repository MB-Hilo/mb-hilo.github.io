export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  nationality?: string;
  'residence visa'?: string;
  linkedin: string;
  consulting?: string;
  website?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  contact: ContactInfo;
}

export interface Skill {
  name: string;
  level: number;
}

export interface DetailedSkill {
  name: string;
  level: number;
  experience: string;
  details?: string[];
}

export interface Skills {
  technical: Skill[];
  soft: Skill[];
  detailedTechnical: DetailedSkill[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location?: string;
  website?: string;
  achievements: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  profile: string;
  skills: Skills;
  languages: string[];
  hobbies: string[];
  experience: Experience[];
  additionalExperience: string;
  education: string[];
}