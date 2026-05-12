export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  caseStudyLink?: string;
  tags?: string;
  tools?: string[]; // Optional field for case study URL
}

export interface ServiceItem {
  num: string;
  title: string;
  tags: string;
  desc: string;
  price: string;
}

export interface WorkItem {
  id: string;
  title: string;
  client: string;
  description: string;
  longDescription: string;
  tags: string[];
  coverUrl: string;
  recordLabelColor: string;
  year: string;
  websiteUrl: string;
}

// Extend the Window interface to include Vanta and Three
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}
