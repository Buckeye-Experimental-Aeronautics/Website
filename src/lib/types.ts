export interface Pillar {
  title: string;
  description: string;
  icon: string;
}

export interface TeamPreview {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface TeamDetail {
  name: string;
  slug: string;
  icon: string;
  lead: string;
  description: string;
  software: string[];
  hardware: string[];
  skills: string[];
}

export interface Prototype {
  title: string;
  badge: "Active" | "Upcoming";
  timeline: string;
  description: string;
}

export interface PrototypeDetail extends Prototype {
  objective: string;
  milestones: string[];
  teamsInvolved: string[];
  /** Photo for the card's side slot; a placeholder box shows without one */
  image?: string;
  imageAlt?: string;
}

export interface ValueProp {
  icon: string;
  title: string;
  body: string;
}

export interface SponsorTier {
  name: string;
  price: string;
  tagline: string;
  benefits: string[];
  highlight?: boolean;
}

export interface LeadershipMember {
  name: string;
  title: string;
  linkedin?: string;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
  hidden?: boolean;
}

export interface PhilosophyCard {
  icon: string;
  title: string;
  points: string[];
}

export interface ProjectItem {
  name: string;
  slug: string;
  status: "In Development" | "In Planning" | "Planned";
  blurb: string;
  /** Longer copy for the project page; falls back to a generic notice */
  description?: string;
  /** Lead image shown full width under the write-up */
  image?: string;
  imageAlt?: string;
  /** Supporting photos below the lead image; placeholder boxes show if empty */
  gallery?: { src: string; alt: string }[];
}
