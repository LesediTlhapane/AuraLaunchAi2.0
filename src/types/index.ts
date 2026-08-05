export type ProjectStatus = 'pending' | 'researching' | 'generating' | 'processing' | 'completed' | 'failed';

export type IndustryType = 
  | 'Hospitality & Dining'
  | 'E-commerce & Retail'
  | 'Fitness & Wellness'
  | 'Creative Studio'
  | 'Real Estate'
  | 'Beauty & Salon'
  | 'Coaching & Consulting'
  | 'Other Services';

export interface MediaItem {
  id: string;
  projectId: string;
  url: string;
  caption?: string;
  category: 'Product' | 'Atmosphere' | 'Team' | 'Portfolio' | 'Quote' | 'Uncategorized';
  qualityScore: number; // 0-100
  isHeroCandidate: boolean;
  aspectRatio?: string;
  likesCount?: number;
  commentsCount?: number;
  extractedDate: string;
}

export interface BusinessInfo {
  businessName: string;
  instagramHandle: string;
  instagramUrl: string;
  industry: IndustryType;
  phone: string;
  email: string;
  address: string;
  operatingHours: string;
  bio: string;
  websiteUrl?: string;
  services: string[];
  notes?: string;
}

export interface BrandTokens {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  personality: {
    professionalism: number; // 0-100
    minimalism: number;
    vibrancy: number;
    luxury: number;
  };
  logoUrl?: string;
}

export interface GeneratedCopySection {
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  servicesIntro: string;
  servicesList: { title: string; description: string; icon?: string }[];
  ctaHeadline: string;
  ctaButtonText: string;
  faqs: { question: string; answer: string }[];
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ExportPackage {
  id: string;
  projectId: string;
  loveablePrompt: string;
  jsonExport: string;
  markdownExport: string;
  htmlPackage?: string;
  createdAt: string;
  downloadCount: number;
}

export interface ProjectRow {
  id: string;
  user_id?: string | null;
  name: string;
  target_instagram_url?: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id?: string | null;
  name?: string;
  target_instagram_url?: string | null;
  businessName: string;
  instagramUrl: string;
  industry: IndustryType;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  mediaCount: number;
  readinessScore: number; // 0-100 readiness percentage for AI generation
  businessInfo: BusinessInfo;
  branding: BrandTokens;
  generatedCopy: GeneratedCopySection;
  media: MediaItem[];
  exports?: ExportPackage;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  avatarUrl?: string;
  role: string;
  createdAt: string;
  usageQuota: {
    projectsUsed: number;
    projectsLimit: number;
    mediaProcessed: number;
    storageUsedGb: number;
    storageLimitGb: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  linkTo?: string;
}

export interface ActivityLog {
  id: string;
  projectId?: string;
  projectTitle?: string;
  action: string;
  timestamp: string;
  user: string;
  status: 'completed' | 'pending' | 'failed';
}

export type ActiveTab = 'dashboard' | 'projects' | 'media' | 'exports' | 'settings' | 'profile' | '404';
