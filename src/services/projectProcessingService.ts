import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { ProjectStatus } from '../types';

export interface ProcessingStep {
  status: ProjectStatus;
  label: string;
  delayMs: number;
}

/**
 * ProjectProcessingService
 * 
 * Responsible for handling asynchronous project transformation pipelines.
 * Currently simulates the AI execution steps:
 *   pending -> researching -> generating -> completed
 * 
 * Modular design allows swapping this with an n8n webhook call in the future
 * without breaking UI callers.
 */
class ProjectProcessingService {
  private activeJobs = new Set<string>();

  /**
   * Process a project asynchronously through the AI pipeline steps.
   */
  async processProject(
    projectId: string,
    onStatusChange?: (projectId: string, status: ProjectStatus) => void
  ): Promise<void> {
    if (this.activeJobs.has(projectId)) {
      console.log(`[ProjectProcessingService] Project ${projectId} is already processing.`);
      return;
    }

    this.activeJobs.add(projectId);
    console.log(`[ProjectProcessingService] Starting pipeline execution for project ${projectId}...`);

    const pipelineSteps: ProcessingStep[] = [
      { status: 'researching', label: 'Researching Instagram metadata & content', delayMs: 3000 },
      { status: 'generating', label: 'Generating design tokens & structured copy', delayMs: 3500 },
      { status: 'completed', label: 'Transformation pipeline completed', delayMs: 3000 },
    ];

    try {
      for (const step of pipelineSteps) {
        await new Promise((resolve) => setTimeout(resolve, step.delayMs));

        console.log(`[ProjectProcessingService] Project ${projectId} status updated to: ${step.status}`);

        // Update status in Supabase DB if configured
        const supabase = getSupabaseClient();
        if (isSupabaseConfigured && supabase) {
          try {
            const { error } = await supabase
              .from('projects')
              .update({
                status: step.status,
                updated_at: new Date().toISOString(),
              })
              .eq('id', projectId);

            if (error) {
              console.error(`[ProjectProcessingService] Supabase update error for status ${step.status}:`, error.message);
            }
          } catch (dbErr) {
            console.error(`[ProjectProcessingService] Failed DB status update:`, dbErr);
          }
        }

        // Trigger callback to update React state / UI
        if (onStatusChange) {
          onStatusChange(projectId, step.status);
        }
      }
    } catch (error) {
      console.error(`[ProjectProcessingService] Pipeline error for project ${projectId}:`, error);
    } finally {
      this.activeJobs.delete(projectId);
    }
  }

  /**
   * Check if a project is currently being processed.
   */
  isProcessing(projectId: string): boolean {
    return this.activeJobs.has(projectId);
  }
}

export const projectProcessingService = new ProjectProcessingService();
