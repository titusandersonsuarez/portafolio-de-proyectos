export type ExperienceType = 'work' | 'education';

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  type: ExperienceType;
  techStack?: string[];
}
