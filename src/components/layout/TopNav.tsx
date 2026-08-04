import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Check, 
  Trash2, 
  User, 
  LogOut, 
  Settings,
  ShieldAlert,
  CheckCircle2,
  Info
} from 'lucide-react';

interface TopNavProps {
  onMobileMenuToggle: () => void;
  onOpenSearch: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMobileMenuToggle, onOpenSearch }) => {
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, clearNotifications, darkMode, toggleDarkMode, setActiveTab } = useProjects();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-20 px-4 lg:px-8 flex items-center justify-between">
      {/* Left section: Mobile menu toggle + Page title or breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Quick Search Bar */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition w-64 border border-slate-200/60 dark:border-slate-700/60"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="flex-1 text-left">Search projects, media...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right section: Search icon (mobile), Dark mode, Notifications, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#45cc42] ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-90 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Notifications</span>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-xs text-slate-400">No new notifications</p>
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
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user?.fullName}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#052b66]/20"
            />
            <span className="hidden md:block text-xs font-semibold text-slate-800 dark:text-slate-200 text-left">
              {user?.fullName || 'User'}
            </span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-bold text-xs text-slate-900 dark:text-white">{user?.fullName}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsUserMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-400" /> Account Profile
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsUserMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-slate-400" /> Settings & APIs
              </button>

              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

              <button
                onClick={() => {
                  logout();
                  setIsUserMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
