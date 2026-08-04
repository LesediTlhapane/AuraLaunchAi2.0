import React, { useState } from 'react';
import { Project, BrandTokens } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { Palette, Type, Sliders, Image, Code2, Save, CheckCircle2 } from 'lucide-react';

interface TabBrandingProps {
  project: Project;
}

export const TabBranding: React.FC<TabBrandingProps> = ({ project }) => {
  const { updateProject } = useProjects();
  const [tokens, setTokens] = useState<BrandTokens>(project.branding);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateProject(project.id, { branding: tokens });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Save */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#052b66] dark:text-blue-400" />
            Brand Identity & Design Tokens
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automatically extracted palette & typography mapped to CSS design tokens.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-[#0a3d8f] transition flex items-center gap-2"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-[#45cc42]" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Tokens Saved!' : 'Save Brand System'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors & Palette Tokens */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-500" /> Color System Tokens
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Primary Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Primary Blue / Brand
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={tokens.primaryColor}
                  onChange={(e) => setTokens({ ...tokens, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 bg-transparent"
                />
                <input
                  type="text"
                  value={tokens.primaryColor}
                  onChange={(e) => setTokens({ ...tokens, primaryColor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Secondary Accent
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={tokens.secondaryColor}
                  onChange={(e) => setTokens({ ...tokens, secondaryColor: e.target.value })}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 bg-transparent"
                />
                <input
                  type="text"
                  value={tokens.secondaryColor}
                  onChange={(e) => setTokens({ ...tokens, secondaryColor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Accent Gold / Highlight */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Highlight Token
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={tokens.accentColor}
                  onChange={(e) => setTokens({ ...tokens, accentColor: e.target.value })}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 bg-transparent"
                />
                <input
                  type="text"
                  value={tokens.accentColor}
                  onChange={(e) => setTokens({ ...tokens, accentColor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Color Preview Swatch Bar */}
          <div className="pt-3">
            <span className="text-xs font-semibold text-slate-500 block mb-2">Live Canvas Swatch Preview</span>
            <div className="h-14 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex">
              <div
                className="flex-1 flex items-center justify-center text-white text-xs font-bold font-mono"
                style={{ backgroundColor: tokens.primaryColor }}
              >
                Primary
              </div>
              <div
                className="flex-1 flex items-center justify-center text-slate-900 text-xs font-bold font-mono"
                style={{ backgroundColor: tokens.secondaryColor }}
              >
                Secondary
              </div>
              <div
                className="flex-1 flex items-center justify-center text-white text-xs font-bold font-mono"
                style={{ backgroundColor: tokens.accentColor }}
              >
                Accent
              </div>
            </div>
          </div>
        </div>

        {/* Typography & Logo */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Type className="w-4 h-4 text-purple-500" /> Typography & Logo Placeholder
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Heading Font Family
              </label>
              <select
                value={tokens.headingFont}
                onChange={(e) => setTokens({ ...tokens, headingFont: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              >
                <option value="Playfair Display">Playfair Display (Serif)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Sans)</option>
                <option value="Montserrat">Montserrat (Geometric)</option>
                <option value="Cinzel">Cinzel (Luxury Serif)</option>
                <option value="Space Grotesk">Space Grotesk (Tech)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Body Font Family
              </label>
              <select
                value={tokens.bodyFont}
                onChange={(e) => setTokens({ ...tokens, bodyFont: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
          </div>

          {/* Logo Placeholder */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-slate-400" /> Extracted Logo / Avatar Placeholder
            </label>
            <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <img
                src={tokens.logoUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150'}
                alt="Logo"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200"
              />
              <input
                type="text"
                placeholder="Logo image URL..."
                value={tokens.logoUrl || ''}
                onChange={(e) => setTokens({ ...tokens, logoUrl: e.target.value })}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Personality Sliders */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#45cc42]" /> Brand Personality Parameters
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Professionalism</span>
              <span>{tokens.personality.professionalism}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tokens.personality.professionalism}
              onChange={(e) =>
                setTokens({
                  ...tokens,
                  personality: { ...tokens.personality, professionalism: parseInt(e.target.value) },
                })
              }
              className="w-full accent-[#052b66]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Minimalism</span>
              <span>{tokens.personality.minimalism}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tokens.personality.minimalism}
              onChange={(e) =>
                setTokens({
                  ...tokens,
                  personality: { ...tokens.personality, minimalism: parseInt(e.target.value) },
                })
              }
              className="w-full accent-[#052b66]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Vibrancy</span>
              <span>{tokens.personality.vibrancy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tokens.personality.vibrancy}
              onChange={(e) =>
                setTokens({
                  ...tokens,
                  personality: { ...tokens.personality, vibrancy: parseInt(e.target.value) },
                })
              }
              className="w-full accent-[#45cc42]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Luxury Appeal</span>
              <span>{tokens.personality.luxury}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tokens.personality.luxury}
              onChange={(e) =>
                setTokens({
                  ...tokens,
                  personality: { ...tokens.personality, luxury: parseInt(e.target.value) },
                })
              }
              className="w-full accent-[#052b66]"
            />
          </div>
        </div>
      </div>

      {/* Generated CSS Variables Code snippet */}
      <div className="bg-slate-950 text-slate-200 rounded-2xl p-5 border border-slate-800 shadow-inner font-mono text-xs overflow-x-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3 text-slate-400">
          <span className="flex items-center gap-2 font-sans font-bold text-xs text-slate-200">
            <Code2 className="w-4 h-4 text-[#45cc42]" /> Exported CSS Design Tokens
          </span>
          <span className="text-[10px]">Ready for Framer / Tailwind</span>
        </div>
        <pre>{`:root {
  --primary-color: ${tokens.primaryColor};
  --secondary-color: ${tokens.secondaryColor};
  --accent-color: ${tokens.accentColor};
  --font-heading: "${tokens.headingFont}", serif;
  --font-body: "${tokens.bodyFont}", sans-serif;
}`}</pre>
      </div>
    </div>
  );
};
