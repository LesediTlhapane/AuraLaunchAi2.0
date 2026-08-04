import React, { useState } from 'react';
import { Project } from '../../types';
import { Monitor, Tablet, Smartphone, Sparkles, ExternalLink, Phone, Mail, MapPin, Instagram, ArrowRight } from 'lucide-react';

interface TabWebsitePreviewProps {
  project: Project;
}

export const TabWebsitePreview: React.FC<TabWebsitePreviewProps> = ({ project }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const heroImage = project.media.find((m) => m.isHeroCandidate)?.url || project.media[0]?.url || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200';

  return (
    <div className="space-y-6">
      {/* Top Device View Switcher */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-blue-50 text-[#052b66] dark:bg-blue-950/40 dark:text-blue-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Responsive Website Preview</h3>
            <p className="text-[11px] text-slate-400">Interactive live rendering of extracted brand & copy</p>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'desktop'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" /> Desktop
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'tablet'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" /> Tablet
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'mobile'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
        </div>
      </div>

      {/* Simulator Container */}
      <div className="bg-slate-950 p-4 sm:p-8 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto min-h-[600px]">
        <div
          className={`bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border border-slate-800 ${
            viewMode === 'desktop'
              ? 'w-full max-w-5xl'
              : viewMode === 'tablet'
              ? 'w-[768px]'
              : 'w-[375px]'
          }`}
        >
          {/* Browser Top Bar Simulation */}
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="px-4 py-1 rounded-md bg-white dark:bg-slate-900 text-[11px] font-mono text-slate-500 border border-slate-200 dark:border-slate-700 w-2/3 text-center truncate">
              {project.businessInfo.websiteUrl || `https://${project.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Generated Website Mockup Canvas */}
          <div className="max-h-[700px] overflow-y-auto selection:bg-[#45cc42] selection:text-[#052b66]">
            {/* Website Navigation Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                {project.branding.logoUrl && (
                  <img src={project.branding.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
                )}
                <span className="font-extrabold text-base tracking-tight" style={{ color: project.branding.primaryColor, fontFamily: project.branding.headingFont }}>
                  {project.businessName}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-600">
                <a href="#about" className="hover:text-black">About</a>
                <a href="#services" className="hover:text-black">Services</a>
                <a href="#gallery" className="hover:text-black">Gallery</a>
                <a href="#contact" className="hover:text-black">Contact</a>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: project.branding.primaryColor }}
              >
                {project.generatedCopy.ctaButtonText || 'Get Started'}
              </button>
            </header>

            {/* Hero Section */}
            <section className="relative px-6 py-16 bg-gradient-to-b from-slate-50 to-white flex flex-col items-center text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-100 text-emerald-800">
                {project.industry}
              </span>
              <h1
                className="text-2xl sm:text-4xl font-extrabold max-w-2xl leading-tight text-slate-900"
                style={{ fontFamily: project.branding.headingFont }}
              >
                {project.generatedCopy.heroHeadline}
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                {project.generatedCopy.heroSubheadline}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: project.branding.primaryColor }}
                >
                  <span>{project.generatedCopy.ctaButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={project.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>Instagram</span>
                </a>
              </div>

              {/* Hero Image Showcase */}
              <div className="mt-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-video">
                <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="px-6 py-12 bg-white border-t border-slate-100">
              <div className="max-w-2xl mx-auto text-center space-y-3">
                <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: project.branding.headingFont }}>
                  Our Story & Purpose
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.generatedCopy.aboutText}
                </p>
              </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="px-6 py-12 bg-slate-50">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: project.branding.headingFont }}>
                    Featured Offerings
                  </h2>
                  <p className="text-xs text-slate-500">{project.generatedCopy.servicesIntro}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.generatedCopy.servicesList.map((srv, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <h3 className="font-bold text-sm text-slate-900">{srv.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Media Gallery Showcase */}
            <section id="gallery" className="px-6 py-12 bg-white">
              <div className="max-w-3xl mx-auto space-y-4">
                <h2 className="text-xl font-bold text-center text-slate-900" style={{ fontFamily: project.branding.headingFont }}>
                  Extracted Instagram Highlights
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.media.slice(0, 6).map((item) => (
                    <div key={item.id} className="aspect-square rounded-xl overflow-hidden border border-slate-100">
                      <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer / Contact */}
            <footer id="contact" className="px-6 py-10 bg-[#052b66] text-white space-y-6">
              <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <h3 className="font-bold text-base text-white mb-2">{project.businessName}</h3>
                  <p className="text-blue-200/80 leading-relaxed mb-4">{project.businessInfo.bio}</p>
                  <p className="text-[#45cc42] font-semibold">{project.businessInfo.operatingHours}</p>
                </div>

                <div className="space-y-2 text-blue-200/90">
                  <p className="font-bold text-white mb-2">Get in Touch</p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#45cc42]" /> {project.businessInfo.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#45cc42]" /> {project.businessInfo.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#45cc42]" /> {project.businessInfo.address}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-blue-900/60 text-center text-[11px] text-blue-300/60">
                © {new Date().getFullYear()} {project.businessName}. Powered by Aura Launch AI.
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
