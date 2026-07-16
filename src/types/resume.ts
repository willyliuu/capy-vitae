export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string[];
}


export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  role: string;
}

export interface ThemeTokens {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  spacing: "compact" | "normal" | "relaxed";
}

export interface CVLayout {
  columns: 1 | 2;
  headerStyle: "centered" | "left-aligned" | "split";
  sidebar?: ("personalInfo" | "skills" | "education")[];
  main: ("summary" | "experience" | "education" | "projects" | "skills")[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects?: Project[];
  skills: string[];
  templateId?: string;
  theme?: ThemeTokens;
  layout?: CVLayout;
}
