import React, { useState, useEffect } from 'react';
import { Project, ProjectIntelligence } from '../../types';
import { projectIntelligenceService } from '../../services/projectIntelligenceService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  Building2, 
  Palette, 
  Users, 
  Target, 
  FileText, 
  Layout, 
  Instagram, 
  Terminal, 
  CheckCircle2, 
  Code2, 
  Loader2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface TabIntelligenceProps {
  project: Project;
}

export const TabIntelligence: React.FC<TabIntelligenceProps> = ({ project }) => {
  const [intelligence, setIntelligence] = useState<ProjectIntelligence | null>(project.intelligence || null);
  const [loading, setLoading] = useState<boolean>(!project.intelligence);
  const [activeSection, setActiveSection] = useState<'all' | 'profile' | 'brand' | 'competitors' | 'marketing' | 'copy' | 'website' | 'social' | 'logs' | 'raw'>('all');
  const [showRawJson, setShowRawJson] = useState<boolean>(false);

  const fetchRecord = async () => {
    setLoading(true);
    try {
      const record = await projectIntelligenceService.getIntelligence(project.id, project);
      setIntelligence(record);
    } catch (err) {
      console.error('Error fetching intelligence record:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [project.id]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#052b66] dark:text-[#45cc42] animate-spin mx-auto" />
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Retrieving Intelligence Record...</h3>
          <p className="text-xs text-slate-400 mt-1">Querying project_intelligence model and structured JSONB schemas</p>
        </div>
      </div>
    );
  }

  if (!intelligence) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <Brain className="w-10 h-10 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No Intelligence Record Found</h3>
        <p className="text-xs text-slate-400">Complete the transformation pipeline to generate structured project intelligence.</p>
        <button
          onClick={fetchRecord}
          className="px-4 py-2 rounded-xl bg-[#052b66] text-white text-xs font-bold hover:bg-[#0a3d8f] transition"
        >
          Generate Record
        </button>
      </div>
    );
  }

  const { business_profile, brand_analysis, competitors, marketing_strategy, generated_copy, website_content, social_media_assets, processing_logs } = intelligence;

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-[#052b66] to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Brain className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#45cc42]/20 text-[#45cc42] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 border border-[#45cc42]/30">
                <Sparkles className="w-3.5 h-3.5" /> Model: project_intelligence
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] font-mono text-slate-300">
                FK: project_id
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              AI Intelligence Record
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Decoupled structured database model containing 8 JSONB payloads. This table is written to directly by automated n8n workflows and read by the frontend.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowRawJson(!showRawJson)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-[#45cc42]" />
              <span>{showRawJson ? 'View Graphic UI' : 'View Raw JSONB'}</span>
            </button>
            <button
              onClick={fetchRecord}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              title="Refresh Record"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Raw JSON View Modal / Block */}
      {showRawJson ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-2xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" /> project_intelligence Record (JSONB)
            </span>
            <span className="text-slate-500 text-[11px]">ID: {intelligence.id}</span>
          </div>
          <pre className="text-emerald-300/90 leading-relaxed max-h-[600px] overflow-y-auto">
            {JSON.stringify(intelligence, null, 2)}
          </pre>
        </motion.div>
      ) : (
        /* Structured UI Display */
        <div className="space-y-6">
          {/* Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Sections' },
              { id: 'profile', label: 'Business Profile' },
              { id: 'brand', label: 'Brand Analysis' },
              { id: 'competitors', label: 'Competitors' },
              { id: 'marketing', label: 'Marketing Strategy' },
              { id: 'copy', label: 'Generated Copy' },
              { id: 'website', label: 'Website Content' },
              { id: 'social', label: 'Social Assets' },
              { id: 'logs', label: 'n8n Logs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeSection === tab.id
                    ? 'bg-[#052b66] dark:bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. JSONB: business_profile */}
            {(activeSection === 'all' || activeSection === 'profile') && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    Business Profile (JSONB)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">business_profile</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Business Name</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{business_profile.businessName}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Instagram Handle</span>
                    <span className="font-semibold text-[#052b66] dark:text-blue-400">{business_profile.instagramHandle}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl col-span-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Unique Value Proposition</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{business_profile.uniqueValueProposition}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl col-span-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Audience</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{business_profile.targetAudience}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. JSONB: brand_analysis */}
            {(activeSection === 'all' || activeSection === 'brand') && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-purple-500" />
                    Brand Analysis (JSONB)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">brand_analysis</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-500 font-semibold">Brand Sentiment Score</span>
                    <span className="font-black text-[#45cc42] text-base flex items-center gap-1">
                      {brand_analysis.sentimentScore}% <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Extracted Color Palette</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md border" style={{ backgroundColor: brand_analysis.primaryColor }} />
                        <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{brand_analysis.primaryColor}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md border" style={{ backgroundColor: brand_analysis.secondaryColor }} />
                        <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{brand_analysis.secondaryColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Typography Specs</span>
                    <p className="text-slate-800 dark:text-slate-200 mt-0.5">
                      Heading: <strong>{brand_analysis.fontFamily.heading}</strong> | Body: <strong>{brand_analysis.fontFamily.body}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. JSONB: competitors */}
            {(activeSection === 'all' || activeSection === 'competitors') && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    Competitor Intelligence (JSONB)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">competitors</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-xl">
                    <span className="text-emerald-800 dark:text-emerald-400 font-bold block">Competitive Advantage</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{competitors.competitiveAdvantage}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Top Industry Rivals</span>
                    {competitors.primaryCompetitors.map((comp, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{comp.name}</p>
                          <p className="text-[11px] text-slate-400">{comp.keyDifference}</p>
                        </div>
                        <span className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono font-bold">
                          {comp.marketShareEst}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. JSONB: marketing_strategy */}
            {(activeSection === 'all' || activeSection === 'marketing') && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-rose-500" />
                    Marketing Strategy (JSONB)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">marketing_strategy</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Content Pillars</span>
                    {marketing_strategy.contentPillars.map((pillar, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">{pillar.title}</span>
                          <p className="text-[11px] text-slate-400">{pillar.description}</p>
                        </div>
                        <span className="text-xs font-bold text-[#052b66] dark:text-[#45cc42]">{pillar.weight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Recommended Growth Channels</span>
                    <div className="flex flex-wrap gap-1.5">
                      {marketing_strategy.recommendedChannels.map((ch, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-[11px] font-semibold">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. JSONB: website_content */}
            {(activeSection === 'all' || activeSection === 'website') && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Layout className="w-4 h-4 text-indigo-500" />
                    Website Schema (JSONB)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">website_content</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Navigation Architecture</span>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                      {website_content.navigation.join('  •  ')}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Page Section Blueprints</span>
                    {website_content.sections.map((sec, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">#{sec.sectionId} - {sec.title}</span>
                        <span className="text-[11px] text-slate-400">{sec.contentType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. JSONB: social_media_assets */}
            {(activeSection === 'all' || activeSection === 'social') && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    Social Media Assets (JSONB)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">social_media_assets</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Analyzed Posts</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{social_media_assets.totalPostsAnalyzed}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Media Quality Score</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-[#45cc42]">{social_media_assets.mediaQualityScore}/100</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl col-span-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Top Hashtags</span>
                    <div className="flex flex-wrap gap-1">
                      {social_media_assets.topHashtags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 font-mono text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 7. JSONB: processing_logs (n8n execution trace) */}
          {(activeSection === 'all' || activeSection === 'logs') && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#45cc42]" />
                  n8n Workflow Execution Logs (JSONB processing_logs)
                </h3>
                <span className="text-[10px] font-mono text-slate-400 uppercase">processing_logs</span>
              </div>

              <div className="space-y-3">
                {processing_logs.map((log, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#45cc42] shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">{log.stage}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-[10px]">
                        {log.executor}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>{log.details}</span>
                      <span className="text-emerald-500 font-bold">{log.executionTimeMs}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
