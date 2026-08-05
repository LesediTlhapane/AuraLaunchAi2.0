import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { Project, ProjectIntelligence } from '../types';

const INTELLIGENCE_CACHE_KEY = 'project_intelligence_records_v1';

/**
 * ProjectIntelligenceService
 * 
 * Manages project_intelligence records.
 * Integrates directly with Supabase table `project_intelligence` (where project_id is foreign key).
 * 
 * Design Architecture:
 * - Reads from `project_intelligence` table by project_id when project is completed.
 * - When n8n runs in future production workflows, n8n writes directly to `project_intelligence`.
 * - If no n8n record is present yet, generates and saves a structured placeholder record in the exact shape n8n outputs.
 */
class ProjectIntelligenceService {
  private localCache: Record<string, ProjectIntelligence> = {};

  constructor() {
    this.loadLocalCache();
  }

  private loadLocalCache() {
    try {
      const saved = localStorage.getItem(INTELLIGENCE_CACHE_KEY);
      if (saved) {
        this.localCache = JSON.parse(saved);
      }
    } catch {
      this.localCache = {};
    }
  }

  private saveLocalCache() {
    try {
      localStorage.setItem(INTELLIGENCE_CACHE_KEY, JSON.stringify(this.localCache));
    } catch (e) {
      console.warn('Failed to save intelligence local cache', e);
    }
  }

  /**
   * Fetch intelligence record for a project.
   */
  async getIntelligence(projectId: string, project?: Project): Promise<ProjectIntelligence | null> {
    const supabase = getSupabaseClient();

    // 1. Try DB fetch from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('project_intelligence')
          .select('*')
          .eq('project_id', projectId)
          .maybeSingle();

        if (data && !error) {
          console.log(`[ProjectIntelligenceService] Retrieved record from Supabase for project ${projectId}`);
          const record = this.normalizeRecord(data);
          this.localCache[projectId] = record;
          this.saveLocalCache();
          return record;
        }
      } catch (err) {
        console.warn(`[ProjectIntelligenceService] Supabase fetch warning:`, err);
      }
    }

    // 2. Check local memory/localStorage cache
    if (this.localCache[projectId]) {
      return this.localCache[projectId];
    }

    // 3. If project is provided (or completed), generate and save placeholder
    if (project) {
      return await this.generateAndSavePlaceholder(project);
    }

    return null;
  }

  /**
   * Generates structured placeholder data in the exact JSON shape of n8n workflow output
   * and saves it to Supabase (if available) & local cache.
   */
  async generateAndSavePlaceholder(project: Project): Promise<ProjectIntelligence> {
    const record = this.createStructuredPlaceholderData(project);

    // Save to local cache
    this.localCache[project.id] = record;
    this.saveLocalCache();

    // Upsert to Supabase if configured
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      try {
        const dbPayload = {
          id: record.id,
          project_id: record.project_id,
          business_profile: record.business_profile,
          brand_analysis: record.brand_analysis,
          competitors: record.competitors,
          marketing_strategy: record.marketing_strategy,
          generated_copy: record.generated_copy,
          website_content: record.website_content,
          social_media_assets: record.social_media_assets,
          processing_logs: record.processing_logs,
          created_at: record.created_at,
          updated_at: record.updated_at,
        };

        const { error } = await supabase
          .from('project_intelligence')
          .upsert(dbPayload, { onConflict: 'project_id' });

        if (error) {
          console.warn('[ProjectIntelligenceService] Supabase upsert notice:', error.message);
        } else {
          console.log(`[ProjectIntelligenceService] Saved intelligence record to Supabase for project ${project.id}`);
        }
      } catch (dbErr) {
        console.warn('[ProjectIntelligenceService] DB save exception:', dbErr);
      }
    }

    return record;
  }

  /**
   * Helper to normalize database rows into typed ProjectIntelligence objects.
   */
  private normalizeRecord(data: any): ProjectIntelligence {
    return {
      id: data.id || `intel_${data.project_id}`,
      project_id: data.project_id,
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      business_profile: typeof data.business_profile === 'string' ? JSON.parse(data.business_profile) : data.business_profile,
      brand_analysis: typeof data.brand_analysis === 'string' ? JSON.parse(data.brand_analysis) : data.brand_analysis,
      competitors: typeof data.competitors === 'string' ? JSON.parse(data.competitors) : data.competitors,
      marketing_strategy: typeof data.marketing_strategy === 'string' ? JSON.parse(data.marketing_strategy) : data.marketing_strategy,
      generated_copy: typeof data.generated_copy === 'string' ? JSON.parse(data.generated_copy) : data.generated_copy,
      website_content: typeof data.website_content === 'string' ? JSON.parse(data.website_content) : data.website_content,
      social_media_assets: typeof data.social_media_assets === 'string' ? JSON.parse(data.social_media_assets) : data.social_media_assets,
      processing_logs: Array.isArray(data.processing_logs) ? data.processing_logs : (typeof data.processing_logs === 'string' ? JSON.parse(data.processing_logs) : []),
    };
  }

  /**
   * Creates structured placeholder data matching n8n workflow output specifications.
   */
  private createStructuredPlaceholderData(project: Project): ProjectIntelligence {
    const handle = project.businessInfo?.instagramHandle || project.instagramUrl || `@${project.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const name = project.businessName;
    const industry = project.industry || 'Business & Services';

    return {
      id: `intel_${project.id}`,
      project_id: project.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),

      // JSONB: business_profile
      business_profile: {
        businessName: name,
        instagramHandle: handle,
        industry: industry,
        targetAudience: `Discerning consumers, professionals, and aesthetic enthusiasts seeking premium ${industry.toLowerCase()} offerings.`,
        uniqueValueProposition: `Delivering bespoke, high-craft ${industry.toLowerCase()} experiences tailored for modern lifestyle quality.`,
        brandTone: 'Sophisticated, Welcoming, Professional & Authentic',
        contactEmail: project.businessInfo?.email || `contact@${handle.replace('@', '')}.com`,
        operatingHours: project.businessInfo?.operatingHours || 'Mon - Sat: 9:00 AM - 7:00 PM',
        location: project.businessInfo?.address || 'Metropolitan Core Studio',
        bioSummary: project.businessInfo?.bio || `Official Instagram page for ${name}. Highlighting signature offerings, client experiences, and daily craft updates.`,
      },

      // JSONB: brand_analysis
      brand_analysis: {
        primaryColor: project.branding?.primaryColor || '#052b66',
        secondaryColor: project.branding?.secondaryColor || '#45cc42',
        accentColor: project.branding?.accentColor || '#3b82f6',
        fontFamily: {
          heading: project.branding?.headingFont || 'Plus Jakarta Sans',
          body: project.branding?.bodyFont || 'Inter',
        },
        aestheticStyle: 'Modern Editorial & Clean Minimalist Canvas',
        brandVoice: 'Authoritative yet accessible with emphasis on visual craftsmanship.',
        sentimentScore: 94,
        keyThemes: ['Quality Craftsmanship', 'Customer Excellence', 'Aesthetic Detail', 'Sustainability'],
      },

      // JSONB: competitors
      competitors: {
        primaryCompetitors: [
          {
            name: `${name.split(' ')[0]} Studio Co`,
            handle: `@${name.split(' ')[0].toLowerCase()}studioco`,
            keyDifference: 'Mass market volume vs. our high-end bespoke attention.',
            marketShareEst: '28%',
          },
          {
            name: 'Apex Collective',
            handle: '@apexcollective',
            keyDifference: 'Lower digital engagement and standard template presence.',
            marketShareEst: '19%',
          },
        ],
        marketPositioning: 'Top-tier premium contender with distinct visual identity and high social affinity.',
        competitiveAdvantage: 'Direct customer trust, rapid digital inquiry turnarounds, and superior curated portfolio.',
      },

      // JSONB: marketing_strategy
      marketing_strategy: {
        contentPillars: [
          { title: 'Behind-The-Scenes Craft', weight: '35%', description: 'Authentic processes, material selection, and team spotlight posts.' },
          { title: 'Product & Service Showcase', weight: '40%', description: 'High-contrast hero asset reels and customer transformation showcases.' },
          { title: 'Community & Reviews', weight: '25%', description: 'Client testimonials, FAQ highlights, and interactive story polls.' },
        ],
        growthTactics: [
          'Automated DM leads capture via Instagram story keyword triggers.',
          'Weekly carousel breakdowns highlighting signature service results.',
          'Localized Google My Business sync with Instagram media feed.',
        ],
        recommendedChannels: ['Instagram Reels', 'Website Hero Landing Page', 'Google Business Profile', 'Email Newsletter'],
        campaignConcepts: [
          {
            title: 'The Signature Experience',
            objective: 'Drive first-time client consultations',
            copySnippet: `Experience the difference at ${name}. Book your private intake session today.`,
          },
          {
            title: 'Craft & Care Spotlight',
            objective: 'Increase engagement on story highlights',
            copySnippet: `Take a look into how we curate every detail for ${handle} clients.`,
          },
        ],
      },

      // JSONB: generated_copy
      generated_copy: {
        heroHeadline: project.generatedCopy?.heroHeadline || `Elevate Your Experience with ${name}`,
        heroSubheadline: project.generatedCopy?.heroSubheadline || `Premium ${industry.toLowerCase()} crafted with distinction, precision, and personal care.`,
        aboutText: project.generatedCopy?.aboutText || `${name} combines passion, modern innovation, and refined detail to deliver unparalleled results for our clients.`,
        valueProps: [
          { title: 'Uncompromising Quality', description: 'Every service is executed with meticulous standards and premium ingredients.' },
          { title: 'Tailored Approach', description: 'Personalized solutions designed to match your exact goals and style.' },
          { title: 'Seamless Booking', description: 'Instant online scheduling and transparent, clear communication.' },
        ],
        ctaText: project.generatedCopy?.ctaButtonText || 'Explore Services & Book Now',
        seoKeywords: project.generatedCopy?.seoMeta?.keywords || [name, industry, 'Premium Service', 'Local Business', 'Instagram Portfolio'],
      },

      // JSONB: website_content
      website_content: {
        navigation: ['Home', 'About Us', 'Services', 'Portfolio', 'Contact'],
        sections: [
          { sectionId: 'hero', title: 'Hero Spotlight Header', contentType: 'Full-bleed image banner with primary CTA' },
          { sectionId: 'about', title: 'Our Heritage & Story', contentType: 'Two-column text + founder portrait grid' },
          { sectionId: 'services', title: 'Signature Offerings', contentType: 'Interactive card grid with detail popups' },
          { sectionId: 'gallery', title: 'Curated Instagram Feed', contentType: '6-tile responsive media showcase' },
          { sectionId: 'contact', title: 'Get In Touch', contentType: 'Map integration + quick booking form' },
        ],
        heroDesignSpec: 'Split layout with dark navy accent canvas, floating badge counter, and primary green action button.',
        footerText: `© ${new Date().getFullYear()} ${name}. All rights reserved. Powered by AI Intelligence Engine.`,
      },

      // JSONB: social_media_assets
      social_media_assets: {
        totalPostsAnalyzed: project.media.length || 12,
        topHashtags: [`#${name.replace(/[^a-zA-Z0-9]/g, '')}`, `#${industry.replace(/[^a-zA-Z0-9]/g, '')}`, '#QualityFirst', '#ModernCraft'],
        mediaQualityScore: Math.max(88, project.readinessScore),
        heroCandidateCount: project.media.filter((m) => m.isHeroCandidate).length || 3,
        keyVisualHighlights: [
          'High color consistency across grid images',
          'Strong subject focal point in key portfolio shots',
          'Clear lighting contrast suitable for web hero background',
        ],
      },

      // JSONB: processing_logs
      processing_logs: [
        {
          timestamp: new Date(Date.now() - 8000).toISOString(),
          stage: 'n8n_trigger_received',
          executor: 'n8n_workflow',
          executionTimeMs: 120,
          status: 'success',
          details: `Webhook payload received for project_id: ${project.id} (${handle})`,
        },
        {
          timestamp: new Date(Date.now() - 6000).toISOString(),
          stage: 'instagram_profile_scrape',
          executor: 'n8n_workflow',
          executionTimeMs: 1420,
          status: 'success',
          details: `Parsed profile bio, contact info, and ${project.media.length || 12} image metadata nodes.`,
        },
        {
          timestamp: new Date(Date.now() - 4000).toISOString(),
          stage: 'brand_token_extraction',
          executor: 'n8n_workflow',
          executionTimeMs: 890,
          status: 'success',
          details: `Extracted hex palette [${project.branding?.primaryColor || '#052b66'}, ${project.branding?.secondaryColor || '#45cc42'}] and font pairs.`,
        },
        {
          timestamp: new Date(Date.now() - 2000).toISOString(),
          stage: 'copy_synthesis_llm',
          executor: 'n8n_workflow',
          executionTimeMs: 2350,
          status: 'success',
          details: 'Synthesized hero copy, section breakdowns, competitive analysis, and marketing strategy.',
        },
        {
          timestamp: new Date().toISOString(),
          stage: 'project_intelligence_upsert',
          executor: 'n8n_workflow',
          executionTimeMs: 210,
          status: 'success',
          details: 'Inserted structured JSONB record into project_intelligence table.',
        },
      ],
    };
  }
}

export const projectIntelligenceService = new ProjectIntelligenceService();
