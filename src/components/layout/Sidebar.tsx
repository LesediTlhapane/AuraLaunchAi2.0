import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ActiveTab } from '../../types';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Image, 
  Download, 
  Settings, 
  User, 
  Plus, 
  Sparkles, 
  X,
  Layers
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const { activeTab, setActiveTab, setIsNewProjectModalOpen } = useProjects();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
    { id: 'media', label: 'Media Library', icon: <Image className="w-5 h-5" /> },
    { id: 'exports', label: 'Exports', icon: <Download className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#052b66] text-white p-5 border-r border-slate-800 select-none">
      {/* Company & App Header */}
      <div className="flex items-center justify-between pb-6 border-b border-blue-900/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#45cc42] to-emerald-600 flex items-center justify-center shadow-md shadow-[#45cc42]/20">
            <Layers className="w-6 h-6 text-[#052b66]" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#45cc42] block">
              Aura Tech Intelligence
            </span>
            <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
              Aura Launch AI
            </h1>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden text-slate-300 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="my-6">
        <button
          onClick={() => {
            setIsNewProjectModalOpen(true);
            onMobileClose();
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#45cc42] hover:bg-[#3ebe3b] text-[#052b66] font-bold text-sm shadow-lg shadow-[#45cc42]/25 flex items-center justify-center gap-2 transition duration-200 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Project</span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-blue-300/60">
          Core Platform
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition duration-150 ${
                isActive
                  ? 'bg-white/10 text-white font-semibold shadow-inner border border-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-[#45cc42]' : 'text-blue-200/70'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-4 bg-[#45cc42] rounded-full shadow-sm shadow-[#45cc42]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Version & AI Readiness Badge */}
      <div className="pt-4 border-t border-blue-900/60">
        <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#45cc42]" />
            <div>
              <p className="text-xs font-semibold text-white">v1.0 SaaS Platform</p>
              <p className="text-[10px] text-blue-300/80">AI Workflow Ready</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#45cc42]/20 text-[#45cc42] font-semibold border border-[#45cc42]/30">
            Active
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative w-72 h-full max-w-xs z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
