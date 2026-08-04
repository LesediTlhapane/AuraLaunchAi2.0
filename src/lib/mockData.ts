import { Project, UserProfile, NotificationItem, ActivityLog } from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr_01h892x',
  email: 'alex.vance@auratech.ai',
  fullName: 'Alex Vance',
  companyName: 'Aura Tech Intelligence',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Product Lead & Founder',
  createdAt: '2026-01-15T09:00:00.000Z',
  usageQuota: {
    projectsUsed: 4,
    projectsLimit: 15,
    mediaProcessed: 142,
    storageUsedGb: 2.8,
    storageLimitGb: 10.0,
  },
};

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Instagram Extraction Complete',
    message: 'Extracted 32 media assets from @koa_coffee_co successfully.',
    timestamp: '10 mins ago',
    read: false,
    type: 'success',
  },
  {
    id: 'notif_2',
    title: 'Brand Palette Detected',
    message: 'Primary blue #0B2545 and secondary gold #C59B27 auto-extracted.',
    timestamp: '1 hour ago',
    read: false,
    type: 'info',
  },
  {
    id: 'notif_3',
    title: 'Ready for Export Pipeline',
    message: 'Luxe Aesthetics Studio passed validation check (100% readiness score).',
    timestamp: '3 hours ago',
    read: true,
    type: 'success',
  },
  {
    id: 'notif_4',
    title: 'Instagram Auth Syncing',
    message: 'Graph API token refreshed for account verification.',
    timestamp: '1 day ago',
    read: true,
    type: 'warning',
  },
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act_101',
    projectId: 'proj_koa_01',
    projectTitle: 'Koa & Coast Coffee Co.',
    action: 'Created new Instagram profile transformation pipeline',
    timestamp: 'Today at 09:14 AM',
    user: 'Alex Vance',
    status: 'completed',
  },
  {
    id: 'act_102',
    projectId: 'proj_luxe_02',
    projectTitle: 'Luxe Aesthetics Studio',
    action: 'Generated brand design tokens & color mapping',
    timestamp: 'Yesterday at 04:30 PM',
    user: 'Alex Vance',
    status: 'completed',
  },
  {
    id: 'act_103',
    projectId: 'proj_apex_03',
    projectTitle: 'Apex Performance Gym',
    action: 'Parsed bio, location & business hours from Instagram metadata',
    timestamp: '2 days ago',
    user: 'System Auto-Parser',
    status: 'completed',
  },
  {
    id: 'act_104',
    projectId: 'proj_verve_04',
    projectTitle: 'Verve Creative Agency',
    action: 'Exported website structure & Loveable AI prompts',
    timestamp: '3 days ago',
    user: 'Alex Vance',
    status: 'completed',
  },
];

export const initialProjects: Project[] = [];

