import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvVar = (keys: string[]): string | undefined => {
  for (const key of keys) {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  }
  return undefined;
};

const supabaseUrl = getEnvVar(['NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL']);
const supabaseAnonKey = getEnvVar(['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY']);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '');

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};
