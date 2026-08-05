import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, IndustryType, ProjectStatus, ActiveTab, NotificationItem, ActivityLog } from '../types';
import { initialNotifications, initialActivityLogs } from '../lib/mockData';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

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

// Helper function to safely parse Supabase projects table row into Project object
function parseSupabaseRow(row: any): Project {
  const businessName = row.name || row.businessName || row.business_name || 'Untitled Business';
  const instagramUrl = row.target_instagram_url || row.instagramUrl || row.instagram_url || '';
  const instagramHandle = instagramUrl ? '@' + String(instagramUrl).split('/').filter(Boolean).pop() : '@business';
  const industry: IndustryType = (row.industry as IndustryType) || 'Hospitality & Dining';

  let mappedStatus: ProjectStatus = 'completed';
  if (row.status === 'pending' || row.status === 'processing' || row.status === 'completed' || row.status === 'failed') {
    mappedStatus = row.status;
  }

  return {
    id: String(row.id || `proj_${Date.now()}`),
    user_id: row.user_id || null,
    name: row.name || businessName,
    target_instagram_url: row.target_instagram_url || instagramUrl,
    businessName,
    instagramUrl,
    industry,
    status: mappedStatus,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
    notes: row.notes || '',
    mediaCount: typeof row.mediaCount === 'number' ? row.mediaCount : (row.media_count || (Array.isArray(row.media) ? row.media.length : 1)),
    readinessScore: typeof row.readinessScore === 'number' ? row.readinessScore : (row.readiness_score || 85),
    businessInfo: typeof row.businessInfo === 'object' && row.businessInfo ? row.businessInfo : {
      businessName,
      instagramHandle,
      instagramUrl,
      industry,
      phone: '+1 (555) 234-5678',
      email: `contact@${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      address: '100 Innovation Way',
      operatingHours: 'Mon-Fri: 9:00 AM – 6:00 PM',
      bio: `${businessName} – Premier digital brand extracted from Instagram. ✨`,
      websiteUrl: `https://${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      services: ['Primary Service', 'Specialty Offerings', 'Consultation'],
      notes: row.notes || '',
    },
    branding: typeof row.branding === 'object' && row.branding ? row.branding : {
      primaryColor: '#052b66',
      secondaryColor: '#45cc42',
      accentColor: '#E2B857',
      backgroundColor: '#F8FAFC',
      textColor: '#0F172A',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
      personality: { professionalism: 85, minimalism: 80, vibrancy: 75, luxury: 80 },
      logoUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
    },
    generatedCopy: typeof row.generatedCopy === 'object' && row.generatedCopy ? row.generatedCopy : {
      heroHeadline: `Official Digital Platform for ${businessName}`,
      heroSubheadline: `Specialized ${industry.toLowerCase()} services and bespoke experiences.`,
      aboutText: `Welcome to ${businessName}. We bring unmatched quality and expertise in ${industry.toLowerCase()}.`,
      servicesIntro: 'Tailored solutions designed for excellence.',
      servicesList: [
        { title: 'Core Services', description: 'Comprehensive solutions tailored to your unique requirements.' },
        { title: 'Advisory & Strategy', description: 'Expert guidance to accelerate growth and visibility.' },
      ],
      ctaHeadline: `Get Started with ${businessName}`,
      ctaButtonText: 'Inquire Now',
      faqs: [
        { question: `How do I contact ${businessName}?`, answer: 'Reach out via our inquiry form or direct message.' },
      ],
      seoMeta: {
        title: `${businessName} | Official Website`,
        description: `Welcome to ${businessName}. Premier ${industry.toLowerCase()} services.`,
        keywords: [businessName.toLowerCase(), industry.toLowerCase()],
      },
    },
    media: Array.isArray(row.media) ? row.media : [
      {
        id: `med_${row.id || Date.now()}`,
        projectId: String(row.id || ''),
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
        caption: `${businessName} workspace and primary showcase.`,
        category: 'Atmosphere',
        qualityScore: 95,
        isHeroCandidate: true,
        aspectRatio: '1:1',
        likesCount: 140,
        commentsCount: 22,
        extractedDate: new Date().toISOString().split('T')[0],
      },
    ],
    exports: typeof row.exports === 'object' && row.exports ? row.exports : {
      id: `exp_${row.id}`,
      projectId: String(row.id),
      loveablePrompt: `Create a landing page for ${businessName} (${industry}).`,
      jsonExport: JSON.stringify({ businessName, industry }, null, 2),
      markdownExport: `# ${businessName}\nIndustry: ${industry}`,
      createdAt: new Date().toISOString(),
      downloadCount: 0,
    },
  };
}

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const { isAuthLoading, isAuthenticated, session: authSession } = useAuth();
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
    // If auth is still restoring session, wait before fetching
    if (isAuthLoading) {
      return;
    }

    setIsLoadingProjects(true);
    setLoadProjectsError(null);

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        // 6. Log before querying projects: current user, current session, access token exists
        console.log('[ProjectContext] Current User:', user);
        console.log('[ProjectContext] Current Session:', currentSession);
        console.log('[ProjectContext] Access Token Exists:', Boolean(currentSession?.access_token));

        // 7. If no session exists, do not query Supabase
        if (!currentSession || !currentSession.access_token) {
          console.warn('[ProjectContext] No active authenticated session found. Skipping Supabase query.');
          setProjects([]);
          setIsLoadingProjects(false);
          return;
        }

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
      // Supabase not configured -> strictly empty projects list
      setProjects([]);
      setIsLoadingProjects(false);
    }
  }, [isAuthLoading]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthenticated) {
        fetchProjects();
      } else {
        setProjects([]);
        setIsLoadingProjects(false);
      }
    }
  }, [fetchProjects, isAuthLoading, isAuthenticated, authSession]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  const createProject = async (data: {
    businessName: string;
    instagramUrl: string;
    industry: IndustryType;
    notes?: string;
  }): Promise<Project> => {
    console.log('[createProject] Started with payload:', data);

    const cleanedHandle = data.instagramUrl.includes('instagram.com/')
      ? `@${data.instagramUrl.split('instagram.com/')[1].replace('/', '')}`
      : data.instagramUrl.startsWith('@')
      ? data.instagramUrl
      : `@${data.instagramUrl}`;

    const formattedUrl = data.instagramUrl.startsWith('http')
      ? data.instagramUrl
      : `https://instagram.com/${cleanedHandle.replace('@', '')}`;

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      const { data: { session: activeSession } } = await supabase.auth.getSession();
      const userId = activeSession?.user?.id;

      // Insert ONLY the valid projects table columns: user_id, name, target_instagram_url, status
      const dbPayload = {
        user_id: userId || null,
        name: data.businessName,
        target_instagram_url: formattedUrl,
        status: 'completed',
      };

      console.log('[supabase.from("projects").insert] Executing insert with payload:', dbPayload);
      const { data: insertedData, error } = await supabase
        .from('projects')
        .insert([dbPayload])
        .select('*');

      console.log('[supabase.from("projects").insert] Response:', { insertedData, error });

      if (error) {
        console.error('[createProject] Supabase insert failed with error:', error.message);
        addToast('error', 'Database Error', error.message || 'Failed to insert project into Supabase.');
        throw new Error(error.message || 'Failed to insert project into Supabase.');
      }

      if (!insertedData || insertedData.length === 0) {
        const msg = 'Supabase insert succeeded but returned no row data.';
        console.error('[createProject]', msg);
        addToast('error', 'Database Error', msg);
        throw new Error(msg);
      }

      console.log('[createProject] Insert confirmed. Reloading projects directly from Supabase...');
      const fetchResult = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchResult.error) {
        console.error('[createProject] Failed to reload projects from Supabase:', fetchResult.error.message);
        addToast('error', 'Fetch Error', fetchResult.error.message);
        throw new Error(fetchResult.error.message);
      }

      const freshProjects = (fetchResult.data || []).map(parseSupabaseRow);
      console.log('[setProjects] Updating state with fresh projects list from Supabase:', freshProjects);
      setProjects(freshProjects);

      const newlyInsertedRow = insertedData[0];
      const createdProjectId = String(newlyInsertedRow.id);
      const createdProject = freshProjects.find((p) => p.id === createdProjectId) || parseSupabaseRow(newlyInsertedRow);

      setActiveProjectId(createdProjectId);
      addToast('success', 'Project Created', `${data.businessName} saved to Supabase projects table.`);

      const newActivity: ActivityLog = {
        id: `act_${Date.now()}`,
        projectId: createdProjectId,
        projectTitle: data.businessName,
        action: 'Created new project and saved to Supabase',
        timestamp: 'Just now',
        user: 'You',
        status: 'completed',
      };
      setActivityLogs((prev) => [newActivity, ...prev]);

      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        title: 'Project Initialized',
        message: `${data.businessName} successfully created and saved in Supabase.`,
        timestamp: 'Just now',
        read: false,
        type: 'success',
      };
      setNotifications((prev) => [newNotif, ...prev]);

      console.log('[createProject] Finished successfully:', createdProject);
      return createdProject;
    } else {
      const errMessage = 'Supabase client is not initialized or configured.';
      console.error('[createProject]', errMessage);
      addToast('error', 'Database Error', errMessage);
      throw new Error(errMessage);
    }
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
    if (isSupabaseConfigured && supabase) {
      try {
        const updatePayload: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };
        if (updates.businessName !== undefined) updatePayload.name = updates.businessName;
        if (updates.name !== undefined) updatePayload.name = updates.name;
        if (updates.instagramUrl !== undefined) updatePayload.target_instagram_url = updates.instagramUrl;
        if (updates.target_instagram_url !== undefined) updatePayload.target_instagram_url = updates.target_instagram_url;
        if (updates.status !== undefined) {
          let validStatus: ProjectStatus = 'completed';
          if (updates.status === 'pending' || updates.status === 'processing' || updates.status === 'completed' || updates.status === 'failed') {
            validStatus = updates.status;
          }
          updatePayload.status = validStatus;
        }

        await supabase.from('projects').update(updatePayload).eq('id', id);
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

