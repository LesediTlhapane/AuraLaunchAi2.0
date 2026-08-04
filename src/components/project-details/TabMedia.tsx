import React, { useState } from 'react';
import { Project, MediaItem } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { Star, Filter, Heart, MessageCircle, X, Maximize2 } from 'lucide-react';

interface TabMediaProps {
  project: Project;
}

export const TabMedia: React.FC<TabMediaProps> = ({ project }) => {
  const { toggleHeroCandidate } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  const categories = ['All', 'Product', 'Atmosphere', 'Team', 'Portfolio', 'Quote'];

  const filteredMedia = selectedCategory === 'All'
    ? project.media
    : project.media.filter((m) => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#052b66] text-white dark:bg-blue-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Showing {filteredMedia.length} of {project.media.length} extracted items
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition duration-200 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={item.url}
                alt={item.caption || 'Instagram Post'}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Overlay Badges */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold">
                  {item.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold">
                  QS: {item.qualityScore}
                </span>
              </div>

              {/* Hero Candidate Badge Toggle */}
              <button
                onClick={() => toggleHeroCandidate(project.id, item.id)}
                title={item.isHeroCandidate ? 'Remove from Hero Candidates' : 'Mark as Hero Candidate'}
                className={`absolute top-2 right-2 p-1.5 rounded-xl backdrop-blur-md transition z-10 ${
                  item.isHeroCandidate
                    ? 'bg-[#45cc42] text-[#052b66] shadow-md shadow-[#45cc42]/30 scale-105'
                    : 'bg-slate-900/60 text-white hover:bg-slate-900'
                }`}
              >
                <Star className={`w-4 h-4 ${item.isHeroCandidate ? 'fill-[#052b66]' : ''}`} />
              </button>

              {/* Expand View Overlay button */}
              <button
                onClick={() => setPreviewMedia(item)}
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
              >
                <Maximize2 className="w-6 h-6" />
              </button>
            </div>

            {/* Post Info Footer */}
            <div className="p-3.5 flex-1 flex flex-col justify-between text-xs space-y-2">
              <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {item.caption || 'No caption available.'}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" /> {item.likesCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-blue-500" /> {item.commentsCount || 0}
                  </span>
                </div>
                <span>{item.extractedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            No media found in category "{selectedCategory}"
          </p>
          <p className="text-xs text-slate-400 mt-1">Try selecting another filter or refresh extraction.</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-900/70 text-white hover:bg-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={previewMedia.url}
                alt={previewMedia.caption}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  {previewMedia.category}
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  Quality Score: {previewMedia.qualityScore}/100
                </span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200">{previewMedia.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
