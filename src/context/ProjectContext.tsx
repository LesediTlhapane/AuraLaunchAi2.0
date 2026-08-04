import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, IndustryType, ActiveTab, NotificationItem, ActivityLog } from '../types';
import { initialProjects, initialNotifications, initialActivityLogs } from '../lib/mockData';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { useToast } from './ToastContext';

interface ProjectContextType {
  projects: Project[];
  isLoadingProjects: boolean;
  loadProjectsError: string | null;
  activeProjectId: string | null;
  activeProject: Project | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  setActiveProjectId: (id: string | null) => void;
  createProject: (data: {
    businessName: string;
    instagramUrl: string;
    industry: IndustryType;
    notes?: string;
  }) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleHeroCandidate: (projectId: string, mediaId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  activityLogs: ActivityLog[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  isNewProjectModalOpen: boolean;
  setIsNewProjectModalOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const PROJECTS_STORAGE_KEY = 'aura_projects_v1';
const THEME_STORAGE_KEY = 'aura_theme_dark';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const [loadProjectsError, setLoadProjectsError] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTabState] = useState<ActiveTab>('dashboard');

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    setActiveProjectId(null);
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved ? JSON.parse(saved) : false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Load Projects from Supabase or LocalStorage
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoadingProjects(true);
      setLoadProjectsError(null);

      const supabase = getSupabaseClient();
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.from('projects').select('*').order('createdAt', { ascending: false });
          if (error) {
            console.warn('Supabase projects query error:', error.message);
            setLoadProjectsError(error.message);
          } else if (data && data.length > 0) {
            setProjects(data as Project[]);
            setIsLoadingProjects(false);
            return;
          }
        } catch (err: any) {
          console.warn('Supabase projects exception:', err);
          setLoadProjectsError(err.message || 'Failed to fetch projects from Supabase');
        }
      }

      // Fallback to localStorage or mockData
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setProjects(parsed);
        } catch {
          setProjects(initialProjects);
        }
      } else {
        setProjects(initialProjects);
      }
      setIsLoadingProjects(false);
    };

    loadProjects();
  }, []);


  // Save to local storage on change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  const createProject = async (data: {
    businessName: string;
    instagramUrl: string;
    industry: IndustryType;
    notes?: string;
  }): Promise<Project> => {
    const cleanedHandle = data.instagramUrl.includes('instagram.com/')
      ? `@${data.instagramUrl.split('instagram.com/')[1].replace('/', '')}`
      : data.instagramUrl.startsWith('@')
      ? data.instagramUrl
      : `@${data.instagramUrl}`;

    const formattedUrl = data.instagramUrl.startsWith('http')
      ? data.instagramUrl
      : `https://instagram.com/${cleanedHandle.replace('@', '')}`;

    const newProj: Project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      businessName: data.businessName,
      instagramUrl: formattedUrl,
      industry: data.industry,
      status: 'in_progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: data.notes || '',
      mediaCount: 12,
      readinessScore: 65,
      businessInfo: {
        businessName: data.businessName,
        instagramHandle: cleanedHandle,
        instagramUrl: formattedUrl,
        industry: data.industry,
        phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
        email: `contact@${data.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        address: '100 Main Street, Suite ' + Math.floor(100 + Math.random() * 800),
        operatingHours: 'Mon-Fri: 8:00 AM – 6:00 PM',
        bio: `${data.businessName} – Premier ${data.industry.toLowerCase()} brand extracted from Instagram. ✨`,
        websiteUrl: `https://${data.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        services: ['Core Services', 'Custom Offerings', 'Consultation', 'Express Delivery'],
        notes: data.notes,
      },
      branding: {
        primaryColor: '#052b66',
        secondaryColor: '#45cc42',
        accentColor: '#3B82F6',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Inter',
        personality: {
          professionalism: 85,
          minimalism: 80,
          vibrancy: 75,
          luxury: 70,
        },
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80',
      },
      generatedCopy: {
        heroHeadline: `Transforming ${data.businessName} into a Digital Masterpiece`,
        heroSubheadline: `Experience exceptional ${data.industry.toLowerCase()} services designed for clients who value perfection and speed.`,
        aboutText: `${data.businessName} is a leading brand in the ${data.industry.toLowerCase()} sector. We deliver curated solutions built on authenticity and quality.`,
        servicesIntro: 'Tailored solutions designed for modern performance.',
        servicesList: [
          { title: 'Primary Service Suite', description: 'Comprehensive solutions customized to your specific needs.' },
          { title: 'Consultation & Strategy', description: 'Direct 1-on-1 guidance to maximize value.' },
        ],
        ctaHeadline: `Connect with ${data.businessName} Today`,
        ctaButtonText: 'Get Started Now',
        faqs: [
          { question: `How do I book a session with ${data.businessName}?`, answer: 'You can easily request a consultation directly through our website or via Instagram DM.' },
        ],
        seoMeta: {
          title: `${data.businessName} | Official Website`,
          description: `Welcome to ${data.businessName}. Premier ${data.industry.toLowerCase()} services and offerings.`,
          keywords: [data.businessName.toLowerCase(), data.industry.toLowerCase(), 'instagram website'],
        },
      },
      media: [
        {
          id: `med_new_1_${Date.now()}`,
          projectId: `proj_${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
          caption: `${data.businessName} workspace setup. Quality and precision in every detail.`,
          category: 'Atmosphere',
          qualityScore: 94,
          isHeroCandidate: true,
          aspectRatio: '1:1',
          likesCount: 840,
          commentsCount: 38,
          extractedDate: new Date().toISOString().split('T')[0],
        },
        {
          id: `med_new_2_${Date.now()}`,
          projectId: `proj_${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
          caption: 'Behind the scenes at our creative headquarter.',
          category: 'Team',
          qualityScore: 91,
          isHeroCandidate: false,
          aspectRatio: '4:3',
          likesCount: 620,
          commentsCount: 19,
          extractedDate: new Date().toISOString().split('T')[0],
        },
      ],
      exports: {
        id: `exp_${Date.now()}`,
        projectId: `proj_${Date.now()}`,
        loveablePrompt: `Create a landing page for ${data.businessName} (${data.industry}). Primary color #052b66, accent green #45cc42. Modern minimal aesthetic.`,
        jsonExport: JSON.stringify({ businessName: data.businessName, industry: data.industry }, null, 2),
        markdownExport: `# ${data.businessName}\nIndustry: ${data.industry}\n...`,
        createdAt: new Date().toISOString(),
        downloadCount: 0,
      },
    };

    // Attempt Supabase insert if available
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('projects').insert([newProj]);
        if (error) {
          console.warn('Supabase insert warning:', error.message);
        } else {
          addToast('success', 'Inserted to Supabase', 'Project stored directly in Supabase project database.');
        }
      } catch (e) {
        console.warn('Supabase exception:', e);
      }
    }

    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newProj.id);

    // Add activity log
    const newActivity: ActivityLog = {
      id: `act_${Date.now()}`,
      projectId: newProj.id,
      projectTitle: newProj.businessName,
      action: 'Created new project & initiated Instagram data parsing',
      timestamp: 'Just now',
      user: 'You',
      status: 'completed',
    };
    setActivityLogs((prev) => [newActivity, ...prev]);

    // Add Notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Project Initialized',
      message: `${newProj.businessName} successfully created and ready for pipeline.`,
      timestamp: 'Just now',
      read: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast('success', 'Project Created', `Started Instagram extraction for ${newProj.businessName}`);
    return newProj;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    let updatedProj: Project | null = null;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updatedProj = {
            ...p,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          return updatedProj;
        }
        return p;
      })
    );

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase && updatedProj) {
      try {
        await supabase.from('projects').update(updatedProj).eq('id', id);
      } catch (err) {
        console.warn('Failed to update project in Supabase:', err);
      }
    }

    addToast('info', 'Project Updated', 'Changes saved successfully.');
  };

  const deleteProject = (id: string) => {
    const projToDelete = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      supabase.from('projects').delete().eq('id', id).then();
    }

    if (activeProjectId === id) {
      const remaining = projects.filter((p) => p.id !== id);
      setActiveProjectId(remaining.length > 0 ? remaining[0].id : null);
    }

    addToast('warning', 'Project Deleted', `Removed ${projToDelete?.businessName || 'project'}.`);
  };

  const toggleHeroCandidate = (projectId: string, mediaId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedMedia = p.media.map((m) =>
            m.id === mediaId ? { ...m, isHeroCandidate: !m.isHeroCandidate } : m
          );
          return { ...p, media: updatedMedia };
        }
        return p;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoadingProjects,
        loadProjectsError,
        activeProjectId,
        activeProject,
        activeTab,
        setActiveTab,
        setActiveProjectId,
        createProject,
        updateProject,
        deleteProject,
        toggleHeroCandidate,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationRead,
        clearNotifications,
        activityLogs,
        darkMode,
        toggleDarkMode,
        isNewProjectModalOpen,
        setIsNewProjectModalOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
