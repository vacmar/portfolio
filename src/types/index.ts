// Common component interfaces and types
export interface NavItem {
  id: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface TimelineItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'planned';
  type: 'learning' | 'project';
  category: string;
  progress: number;
  date: string;
  position: { x: number; y: number };
  connections: number[];
  github?: string;
  demo?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Animation variants (standardized)
export interface AnimationVariant {
  hidden: object;
  visible: object;
}

// Common props for components
export interface SectionProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}
