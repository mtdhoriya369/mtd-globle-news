/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string; // 'world' | 'business' | 'tech' | 'energy-economy' | 'opinion'
  imageUrl: string;
  views: number;
  likes: number;
  comments: Comment[];
  isFeatured?: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  darkMode: boolean;
  font: 'Poppins' | 'Roboto' | 'Merriweather';
  layout: 'grid' | 'list';
  breakingText: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  footerText: string;
  visibleSections: {
    home: boolean;
    world: boolean;
    business: boolean;
    tech: boolean;
    energy: boolean;
    opinions: boolean;
    contact: boolean;
  };
}
