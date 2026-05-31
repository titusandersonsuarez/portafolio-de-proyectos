export type ExperienceType = 'work' | 'education';

export interface ExperienceMedia {
  type: 'image' | 'pdf';
  url: string;
  label: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  type: ExperienceType;
  techStack?: string[];
  systems?: string[];
  achievements?: string[];
  media?: ExperienceMedia;
}
