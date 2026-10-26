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
  /** Captura de la app (ruta relativa a public/). */
  imageUrl?: string;
  imageAlt?: string;
  /** Video corto de la app funcionando (ruta relativa a public/). */
  videoUrl?: string;
  /** Producto comercial: el código no se publica, se ofrece una demo. */
  privateCode?: boolean;
  featured: boolean;
}
