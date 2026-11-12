import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { CategoryId } from "./events";

// Impact statistics shown on homepage
export type ImpactStat = {
  value: string;
  suffix: string;
  label: string;
  detail: string;
  icon: LucideIcon;
};

// "How it works" 3-step guide
export type HowItWorksStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

// Completed event activity feed
export type Activity = {
  title: string;
  location: string;
  participants: number;
  description: string;
  image: StaticImageData;
  date: string;
};

// Partner organization details
export type Partner = {
  name: string;
  focus: string;
  icon: LucideIcon;
};

// Featured volunteer profile of the month
export type VolunteerProfile = {
  name: string;
  role: string;
  city: string;
  quote: string;
  hours: number;
  events: number;
  causes: number;
  image: StaticImageData;
  achievements: string[];
};

// Volunteer testimonial quote
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  event: string;
  image: StaticImageData;
};

// Story article card
export type Story = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: StaticImageData;
};

// Active community hub location
export type Community = {
  city: string;
  events: number;
  focus: string;
  description: string;
  x: number;
  y: number;
};

// FAQ item accordion
export type Faq = {
  question: string;
  answer: string;
};

// Search & filter state shared across homepage sections
export type HomeSearchContextValue = {
  query: string;
  category: CategoryId | "all";
  city: string;
  hasFilters: boolean;
  setQuery: (value: string) => void;
  setCategory: (value: CategoryId | "all") => void;
  setCity: (value: string) => void;
  clearFilters: () => void;
  search: (value: string) => void;
  scrollToEvents: () => void;
};
