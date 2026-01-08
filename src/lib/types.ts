export type MediaItem = {
  type: "image" | "video";
  url: string;
};

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  link: string;
  description: string;
  technologies: string[];
  role: string[];
  media: MediaItem[];
}

export type ProjectCategory = "all" | "web" | "mobile" | "ai" | "game";

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface NavItem {
  href: string;
  label: string;
}

export interface SocialLink {
  type: "email" | "github" | "linkedin" | "phone";
  url: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  image: string;
  bio: string[];
}

