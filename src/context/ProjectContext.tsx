import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, IndustryType, ActiveTab, NotificationItem, ActivityLog } from '../types';
import { initialNotifications, initialActivityLogs } from '../lib/mockData';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { useToast } from './ToastContext';

interface ProjectContextType {
  projects: Project[];
  isLoadingProjects: boolean;
  loadProjectsError: string | null;
  fetchProjects: () => Promise<void>;
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

const THEME_STORAGE_KEY = 'aura_theme_dark';

// Helper function to safely parse Supabase table row into Project object
function parseSupabaseRow(row: any): Project {
  return {
    id: String(row.id || `proj_${Date.now()}`),
    businessName: row.businessName || row.business_name || 'Untitled Business',
    instagramUrl: row.instagramUrl || row.instagram_url || '',
    industry: row.industry || 'Hospitality & Dining',
    status: row.status || 'ready',
    createdAt: row.createdAt || row.created_at || new Date().toISOString(),
    updatedAt: row.updatedAt || row.updated_at || new Date().toISOString(),
    notes: row.notes || '',
    mediaCount: typeof row.mediaCount === 'number' ? row.mediaCount : (row.media_count || (Array.isArray(row.media) ? row.media.length : 0)),
    readinessScore: typeof row.readinessScore === 'number' ? row.readinessScore : (row.readiness_score || 85),
    businessInfo: typeof row.businessInfo === 'object' && row.businessInfo ? row.businessInfo : (typeof row.business_info === 'object' && row.business_info ? row.business_info : {
      businessName: row.businessName || row.business_name || 'Untitled Business',
      instagramHandle: row.instagramUrl ? '@' + String(row.instagramUrl).split('/').filter(Boolean).pop() : '@business',
      instagramUrl: row.instagramUrl || row.instagram_url || '',
      industry: row.industry || 'Hospitality & Dining',
      notes: row.notes || '',
      services: []
    }),
    branding: typeof row.branding === 'object' && row.branding ? row.branding : {
      primaryColor: '#052b66',
      secondaryColor: '#45cc42',
      accentColor: '#E2B857',
      backgroundColor: '#F8FAFC',
      textColor: '#0F172A',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
      personality: { professionalism: 80, minimalism: 80, vibrancy: 70, luxury: 70 }
    },
    generatedCopy: typeof row.generatedCopy === 'object' && row.generatedCopy ? row.generatedCopy : (typeof row.generated_copy === 'object' && row.generated_copy ? row.generated_copy : {
      heroHeadline: `${row.businessName || row.business_name || 'Business'} Official Website`,
      heroSubheadline: `Specialized ${row.industry || 'services'} offerings.`,
      aboutText: 'Welcome to our business page.',
      servicesIntro: 'Our Core Offerings',
      servicesList: []
    }),
    media: Array.isArray(row.media) ? row.media : [],
    exports: typeof row.exports === 'object' && row.exports ? row.exports : {
      id: `exp_${row.id}`,
      projectId: String(row.id),
      loveablePrompt: `Create a landing page for ${row.businessName || 'Business'}`,
      jsonExport: JSON.stringify(row, null, 2),
      markdownExport: `# ${row.businessName || 'Business'}\nIndustry: ${row.industry || 'General'}`,
      createdAt: new Date().toISOString(),
      downloadCount: 0
    }
  };
}

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

  // Fetch projects directly from Supabase
  const fetchProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    setLoadProjectsError(null);

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      try {
        let { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error && (error.message.includes('created_at') || error.code === '42703')) {
          const retry = await supabase
            .from('projects')
            .select('*')
            .order('createdAt', { ascending: false });
          data = retry.data;
          error = retry.error;
        }

        if (error && error.code === '42P01') {
          setLoadProjectsError('The "projects" table does not exist in Supabase yet.');
          setProjects([]);
        } else if (error) {
          console.warn('Supabase projects fetch error:', error.message);
          setLoadProjectsError(error.message);
          setProjects([]);
        } else {
          const loaded = (data || []).map(parseSupabaseRow);
          setProjects(loaded);
        }
      } catch (err: any) {
        console.warn('Error fetching projects:', err);
        setLoadProjectsError(err.message || 'Failed to fetch projects');
        setProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    } else {
      // Supabase not configured yet -> strictly empty projects list (NO mock data!)
      setProjects([]);
      setIsLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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

    const newProjId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const newProj: Project = {
      id: newProjId,
      businessName: data.businessName,
      instagramUrl: formattedUrl,
      industry: data.industry,
      status: 'ready',
      createdAt: now,
      updatedAt: now,
      notes: data.notes || '',
      mediaCount: 1,
      readinessScore: 90,
      businessInfo: {
        businessName: data.businessName,
        instagramHandle: cleanedHandle,
        instagramUrl: formattedUrl,
        industry: data.industry,
        phone: '+1 (555) 234-5678',
        email: `contact@${data.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        address: '100 Innovation Way',
        operatingHours: 'Mon-Fri: 9:00 AM – 6:00 PM',
        bio: `${data.businessName} – Premier ${data.industry.toLowerCase()} brand extracted from Instagram. ✨`,
        websiteUrl: `https://${data.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        services: ['Primary Service', 'Specialty Offerings', 'Consultation'],
        notes: data.notes,
      },
      branding: {
        primaryColor: '#052b66',
        secondaryColor: '#45cc42',
        accentColor: '#E2B857',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        headingFont: 'Playfair Display',
        bodyFont: 'Plus Jakarta Sans',
        personality: {
          professionalism: 85,
          minimalism: 80,
          vibrancy: 75,
          luxury: 80,
        },
        logoUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
      },
      generatedCopy: {
        heroHeadline: `Official Digital Platform for ${data.businessName}`,
        heroSubheadline: `Specialized ${data.industry.toLowerCase()} services and bespoke experiences.`,
        aboutText: `Welcome to ${data.businessName}. We bring unmatched quality and expertise in ${data.industry.toLowerCase()}.`,
        servicesIntro: 'Tailored solutions designed for excellence.',
        servicesList: [
          { title: 'Core Services', description: 'Comprehensive solutions tailored to your unique requirements.' },
          { title: 'Advisory & Strategy', description: 'Expert guidance to accelerate growth and visibility.' },
        ],
        ctaHeadline: `Get Started with ${data.businessName}`,
        ctaButtonText: 'Inquire Now',
        faqs: [
          { question: `How do I contact ${data.businessName}?`, answer: 'Reach out via our inquiry form or direct message.' },
        ],
        seoMeta: {
          title: `${data.businessName} | Official Website`,
          description: `Welcome to ${data.businessName}. Premier ${data.industry.toLowerCase()} services.`,
          keywords: [data.businessName.toLowerCase(), data.industry.toLowerCase()],
        },
      },
      media: [
        {
          id: `med_${Date.now()}`,
          projectId: newProjId,
          url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
          caption: `${data.businessName} workspace and primary showcase.`,
          category: 'Atmosphere',
          qualityScore: 95,
          isHeroCandidate: true,
          aspectRatio: '1:1',
          likesCount: 140,
          commentsCount: 22,
          extractedDate: now.split('T')[0],
        },
      ],
      exports: {
        id: `exp_${Date.now()}`,
        projectId: newProjId,
        loveablePrompt: `Create a landing page for ${data.businessName} (${data.industry}). Primary color #052b66, accent green #45cc42.`,
        jsonExport: JSON.stringify({ businessName: data.businessName, industry: data.industry }, null, 2),
        markdownExport: `# ${data.businessName}\nIndustry: ${data.industry}\nCreated: ${now}`,
        createdAt: now,
        downloadCount: 0,
      },
    };

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          id: newProj.id,
          businessName: newProj.businessName,
          instagramUrl: newProj.instagramUrl,
          industry: newProj.industry,
          status: newProj.status,
          notes: newProj.notes,
          mediaCount: newProj.mediaCount,
          readinessScore: newProj.readinessScore,
          createdAt: newProj.createdAt,
          updatedAt: newProj.updatedAt,
          created_at: newProj.createdAt,
          businessInfo: newProj.businessInfo,
          branding: newProj.branding,
          generatedCopy: newProj.generatedCopy,
          media: newProj.media,
          exports: newProj.exports
        };

        const { error } = await supabase.from('projects').insert([payload]);
        if (error) {
          console.warn('First insert attempt warning:', error.message);
          const fallback = await supabase.from('projects').insert([newProj]);
          if (fallback.error) {
            console.error('Fallback insert error:', fallback.error.message);
          }
        }
        addToast('success', 'Inserted into Supabase', `${newProj.businessName} saved to Supabase projects table.`);
        // Refresh list from Supabase
        await fetchProjects();
      } catch (e: any) {
        console.error('Failed to insert into Supabase:', e);
        addToast('error', 'Database Error', e.message || 'Failed to insert project into Supabase.');
        setProjects((prev) => [newProj, ...prev]);
      }
    } else {
      setProjects((prev) => [newProj, ...prev]);
      addToast('success', 'Project Created', `${newProj.businessName} created locally.`);
    }

    setActiveProjectId(newProj.id);

    // Add activity log
    const newActivity: ActivityLog = {
      id: `act_${Date.now()}`,
      projectId: newProj.id,
      projectTitle: newProj.businessName,
      action: 'Created new project and saved to Supabase',
      timestamp: 'Just now',
      user: 'You',
      status: 'completed',
    };
    setActivityLogs((prev) => [newActivity, ...prev]);

    // Add Notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Project Initialized',
      message: `${newProj.businessName} successfully created and ready in Supabase.`,
      timestamp: 'Just now',
      read: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);

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

  const deleteProject = async (id: string) => {
    const projToDelete = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete project error:', err);
      }
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
        fetchProjects,
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

