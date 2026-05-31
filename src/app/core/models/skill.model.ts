export type SkillCategory = 'language' | 'framework' | 'database' | 'tool' | 'cloud';

export interface Skill {
  name: string;
  category: SkillCategory;
  iconName?: string;
  level?: 1 | 2 | 3 | 4 | 5;
}
