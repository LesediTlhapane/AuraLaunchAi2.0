import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { IndustryType, ProjectStatus } from '../types';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  FolderKanban, 
  Calendar, 
  ExternalLink, 
  Trash2, 
  Star,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const ProjectsPage: React.FC = () => {
  const { projects, setActiveProjectId, setIsNewProjectModalOpen, deleteProject } = useProjects();

  const [viewStyle, setViewStyle] = useState<'table' | 'cards'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updatedAt' | 'businessName' | 'readinessScore'>('updatedAt');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Filter & Sort
  const filtered = projects
    .filter((p) => {
      const matchesSearch =
        p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.businessInfo.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'businessName') return a.businessName.localeCompare(b.businessName);
      if (sortBy === 'readinessScore') return b.readinessScore - a.readinessScore;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#052b66] dark:text-[#45cc42]">
            Pipelines Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Instagram Transformation Projects
          </h1>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-[#0a3d8f] transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#45cc42]" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by business name or handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#052b66]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-between md:justify-end">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Statuses</option>
              <option value="ready">Ready</option>
              <option value="in_progress">In Progress</option>
              <option value="draft">Draft</option>
              <option value="exported">Exported</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="updatedAt">Last Updated</option>
              <option value="businessName">Business Name</option>
              <option value="readinessScore">AI Readiness</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewStyle('cards')}
              className={`p-1.5 rounded-lg transition ${
                viewStyle === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewStyle('table')}
              className={`p-1.5 rounded-lg transition ${
                viewStyle === 'table'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewStyle === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.branding.logoUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100'}
                      alt={project.businessName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                        {project.businessName}
                      </h3>
                      <p className="text-xs text-slate-400">{project.businessInfo.instagramHandle}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      project.status === 'ready' || project.status === 'exported'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-blue-500" />
                    <span>Industry: {project.industry}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-emerald-500" />
                    <span>Readiness: {project.readinessScore}%</span>
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setProjectToDelete(project.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setActiveProjectId(project.id)}
                    className="px-4 py-2 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition shadow-xs"
                  >
                    Open Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Business Name</th>
                  <th className="py-3.5 px-4">Instagram URL</th>
                  <th className="py-3.5 px-4">Industry</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4">Last Updated</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {project.businessName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {project.businessInfo.instagramHandle}
                    </td>
                    <td className="py-3.5 px-4">{project.industry}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          project.status === 'ready' || project.status === 'exported'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4">{new Date(project.updatedAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveProjectId(project.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#052b66] dark:bg-blue-600 text-white font-semibold text-xs hover:bg-[#0a3d8f] transition"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={Boolean(projectToDelete)}
        title="Delete Project"
        message="Are you sure you want to remove this project? This will erase all media indexing and generated copy."
        confirmLabel="Delete Project"
        isDanger
        onConfirm={() => projectToDelete && deleteProject(projectToDelete)}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
};
