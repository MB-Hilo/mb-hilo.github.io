export interface Location {
  place: string;
  phone: string;
}

export interface Link {
  text: string;
  url: string;
}

export interface Contact {
  locations: Location[];
  email: string;
  links: Link[];
}

export interface Job {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface SkillRow {
  label: string;
  items: string;
}

export interface Credential {
  name: string;
  school: string;
  year: string;
}

export interface ResumeData {
  name: string;
  headline: string;
  contact: Contact;
  summary: string;
  experience: Job[];
  skills: SkillRow[];
  education: Credential[];
}
