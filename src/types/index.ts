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

export interface BusinessProfileJSON {
  businessName: string;
  instagramHandle: string;
  industry: string;
  targetAudience: string;
  uniqueValueProposition: string;
  brandTone: string;
  contactEmail: string;
  operatingHours: string;
  location: string;
  bioSummary: string;
}

export interface BrandAnalysisJSON {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: { heading: string; body: string };
  aestheticStyle: string;
  brandVoice: string;
  sentimentScore: number;
  keyThemes: string[];
}

export interface CompetitorItem {
  name: string;
  handle: string;
  keyDifference: string;
  marketShareEst: string;
}

export interface CompetitorsJSON {
  primaryCompetitors: CompetitorItem[];
  marketPositioning: string;
  competitiveAdvantage: string;
}

export interface MarketingStrategyJSON {
  contentPillars: { title: string; weight: string; description: string }[];
  growthTactics: string[];
  recommendedChannels: string[];
  campaignConcepts: { title: string; objective: string; copySnippet: string }[];
}

export interface GeneratedCopyJSON {
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  valueProps: { title: string; description: string }[];
  ctaText: string;
  seoKeywords: string[];
}

export interface WebsiteContentJSON {
  navigation: string[];
  sections: { sectionId: string; title: string; contentType: string }[];
  heroDesignSpec: string;
  footerText: string;
}

export interface SocialMediaAssetsJSON {
  totalPostsAnalyzed: number;
  topHashtags: string[];
  mediaQualityScore: number;
  heroCandidateCount: number;
  keyVisualHighlights: string[];
}

export interface ProcessingLogItem {
  timestamp: string;
  stage: string;
  executor: 'n8n_workflow' | 'pipeline_simulator';
  executionTimeMs: number;
  status: 'success' | 'warning' | 'error';
  details: string;
}

export interface ProjectIntelligence {
  id: string;
  project_id: string;
  created_at: string;
  updated_at: string;
  business_profile: BusinessProfileJSON;
  brand_analysis: BrandAnalysisJSON;
  competitors: CompetitorsJSON;
  marketing_strategy: MarketingStrategyJSON;
  generated_copy: GeneratedCopyJSON;
  website_content: WebsiteContentJSON;
  social_media_assets: SocialMediaAssetsJSON;
  processing_logs: ProcessingLogItem[];
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
  intelligence?: ProjectIntelligence;
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
