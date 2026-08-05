import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Plus,
  Trash2, 
  User, 
  LogOut, 
  Settings,
  ShieldAlert,
  CheckCircle2,
  Info,
  Sparkles
} from 'lucide-react';

interface TopNavProps {
  onMobileMenuToggle: () => void;
  onOpenSearch: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMobileMenuToggle, onOpenSearch }) => {
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, clearNotifications, darkMode, toggleDarkMode, setActiveTab, setIsNewProjectModalOpen } = useProjects();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-4 z-20 mx-4 lg:mx-8 mb-6">
      <div className="glass-nav rounded-2xl lg:rounded-3xl px-4 lg:px-6 h-16 flex items-center justify-between shadow-xl shadow-slate-900/5">
        {/* Left section: Mobile menu toggle + Quick Search Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Bar */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition w-64 md:w-80 border border-slate-200/60 dark:border-white/10"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left font-medium">Search projects, media...</span>
            <kbd className="px-2 py-0.5 rounded-lg bg-white/80 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 text-[10px] font-mono font-bold text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right section: Quick Create + Theme + Notifications + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Create Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsNewProjectModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#052b66] to-[#0a3d8f] dark:from-blue-600 dark:to-indigo-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition"
          >
            <Plus className="w-3.5 h-3.5 text-[#45cc42]" />
            <span>Create</span>
          </motion.button>

          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#45cc42] ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 dark:border-white/10 py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Notifications</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] font-semibold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-xs text-slate-400 font-medium">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 text-xs flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                          !n.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
                        {n.type === 'warning' && <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                        {n.type === 'info' && <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{n.title}</p>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">{n.message}</p>
                          <span className="text-[10px] font-mono text-slate-400 mt-1 block">{n.timestamp}</span>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#45cc42] mt-1 shrink-0" />}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* User Avatar Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="relative">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={user?.fullName}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#052b66]/20 dark:ring-white/10"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#45cc42] ring-2 ring-white dark:ring-slate-900" />
              </div>
              <span className="hidden md:block text-xs font-extrabold text-slate-800 dark:text-slate-100 text-left truncate max-w-[100px]">
                {user?.fullName || 'User'}
              </span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 dark:border-white/10 py-2 z-50">
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-extrabold text-xs text-slate-900 dark:text-white truncate">{user?.fullName}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{user?.email}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                >
                  <User className="w-4 h-4 text-slate-400" /> Account Profile
                </button>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Settings & APIs
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

