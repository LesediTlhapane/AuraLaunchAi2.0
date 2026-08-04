import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { MediaPage } from './pages/MediaPage';
import { ExportsPage } from './pages/ExportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { ToastContainer } from './components/common/ToastContainer';
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { NewProjectModal } from './components/projects/NewProjectModal';

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activeTab, activeProjectId, isNewProjectModalOpen, setIsNewProjectModalOpen } = useProjects();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 flex font-sans selection:bg-[#45cc42] selection:text-[#052b66]">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        <TopNav
          onMobileMenuToggle={() => setMobileSidebarOpen(true)}
          onOpenSearch={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Dynamic page switching */}
          {activeProjectId ? (
            <ProjectDetailsPage />
          ) : (
            <>
              {activeTab === 'dashboard' && <DashboardPage />}
              {activeTab === 'projects' && <ProjectsPage />}
              {activeTab === 'media' && <MediaPage />}
              {activeTab === 'exports' && <ExportsPage />}
              {activeTab === 'settings' && <SettingsPage />}
              {activeTab === 'profile' && <ProfilePage />}
              {activeTab === '404' && <NotFoundPage />}
            </>
          )}
        </main>
      </div>

      {/* Floating Modals & Toasts */}
      <ToastContainer />
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProjectProvider>
          <MainLayout />
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
