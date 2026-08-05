import React from 'react';
import { motion } from 'motion/react';
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
  Layers,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const { activeTab, setActiveTab, setIsNewProjectModalOpen } = useProjects();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'media', label: 'Media Assets', icon: <Image className="w-4 h-4" /> },
    { id: 'exports', label: 'Exports', icon: <Download className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#052b66]/95 dark:bg-slate-950/95 text-white p-5 rounded-[28px] lg:rounded-[32px] backdrop-blur-2xl border border-white/15 dark:border-white/10 shadow-2xl shadow-[#052b66]/30 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#45cc42] via-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-[#45cc42]/25 ring-1 ring-white/30">
            <Layers className="w-5 h-5 text-[#052b66]" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#45cc42] block">
              AURA INTELLIGENCE
            </span>
            <h1 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1">
              Aura Launch AI
            </h1>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden text-white/70 hover:text-white p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Workspace Selector */}
      <div className="mt-4 p-2.5 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-between text-xs text-white/90 cursor-pointer hover:bg-white/15 transition">
        <div className="flex items-center gap-2 truncate">
          <div className="w-2 h-2 rounded-full bg-[#45cc42] animate-pulse shrink-0" />
          <span className="font-semibold truncate">Enterprise Workspace</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-white/60 shrink-0" />
      </div>

      {/* Primary Action Button */}
      <div className="my-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsNewProjectModalOpen(true);
            onMobileClose();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#45cc42] to-emerald-400 text-[#052b66] font-extrabold text-xs tracking-wide uppercase shadow-lg shadow-[#45cc42]/25 flex items-center justify-center gap-2 transition duration-200"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
          Navigation
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'text-white font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarPill"
                  className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-xs"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-3">
                <span className={isActive ? 'text-[#45cc42]' : 'text-white/60'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {isActive && (
                <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#45cc42] shadow-sm shadow-[#45cc42]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Version Card */}
      <div className="pt-4 border-t border-white/10">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#45cc42]" />
            <div>
              <p className="text-xs font-bold text-white">v1.0 SaaS Ready</p>
              <p className="text-[10px] text-white/60">Supabase Connected</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#45cc42]/20 text-[#45cc42] font-bold border border-[#45cc42]/30">
            Online
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Floating Glass Sidebar */}
      <aside className="hidden lg:block w-64 h-[calc(100vh-2rem)] fixed left-4 top-4 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex p-3">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
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

