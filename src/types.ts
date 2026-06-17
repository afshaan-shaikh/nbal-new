export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  specs: string[];
  image: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  beds: number | string;
  description: string;
  spaceOptimization?: string;
  equipmentConfig?: string;
  category: 'cardiac' | 'maternity' | 'general' | 'ot_icu' | 'biomedical';
  status: 'Completed' | 'Ongoing' | 'Expansion';
  beforeAfterImage?: {
    before: string;
    after: string;
  };
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  hospital: string;
  text: string;
  rating: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  hospitalName: string;
  location: string;
  requirement: string;
  status: 'new' | 'contacted' | 'resolved';
  datetime: string;
  aiClassification?: {
    urgency: 'high' | 'medium' | 'low';
    categories: string[];
    advisorySummary: string;
  };
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  bgImage: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  googleMapsUrl: string;
}

export interface SocialLinks {
  linkedin: string;
  facebook: string;
  instagram: string;
  youtube: string;
  email: string;
}

export interface AppContent {
  hero: HeroContent;
  services: Service[];
  projects: Project[];
  blogs: Blog[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
}
