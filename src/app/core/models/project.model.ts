export type ProjectType = 'embeddable' | 'backend' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  type: ProjectType;
  embedPath?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}
