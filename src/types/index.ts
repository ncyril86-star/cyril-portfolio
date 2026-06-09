export type ProjectStatus = "completed" | "ongoing";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageBgClass?: string;
  tags: string[];
  status: ProjectStatus;
  linkUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  accent: "coral" | "teal" | "yellow";
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}
