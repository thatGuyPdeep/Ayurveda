import { supabase, supabaseAdmin } from '@/lib/supabase'

export abstract class BaseService {
  protected supabase = supabase
  protected supabaseAdmin = supabaseAdmin

  protected async withErrorHandling<T>(
    operation: () => Promise<T>,
    context: { service: string; method: string; params?: any }
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      console.error(`Error in ${context.service}.${context.method}:`, error)
      // In production, send to monitoring service
      // this.monitoring.captureException(error as Error, {
      //   tags: { service: context.service, method: context.method },
      //   extra: context.params
      // })
      throw error
    }
  }

  protected async withCache<T>(
    key: string,
    operation: () => Promise<T>,
    ttl = 3600 // 1 hour default
  ): Promise<T> {
    // For now, just execute the operation
    // In production, implement Redis caching
    return await operation()
  }

  protected generateId(): string {
    return crypto.randomUUID()
  }

  protected validateRequired(fields: Record<string, any>, requiredFields: string[]): void {
    const missingFields = requiredFields.filter(field => !fields[field])
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }
  }
} 