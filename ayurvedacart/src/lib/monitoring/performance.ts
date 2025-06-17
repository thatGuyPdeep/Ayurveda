import { analyticsService } from '@/lib/services/analytics'

export interface PerformanceMetrics {
  // Core Web Vitals
  largest_contentful_paint: number
  first_input_delay: number
  cumulative_layout_shift: number
  first_contentful_paint: number
  time_to_first_byte: number
  
  // Custom metrics
  page_load_time: number
  api_response_time: number
  error_rate: number
  bounce_rate: number
  
  // User context
  user_agent: string
  connection_type: string
  device_memory?: number
  viewport_size: { width: number; height: number }
  timestamp: string
}

export interface ErrorReport {
  error_type: string
  error_message: string
  stack_trace?: string
  user_id?: string
  session_id?: string
  page_url: string
  user_agent: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  additional_context?: Record<string, any>
}

export class PerformanceMonitor {
  private observer: PerformanceObserver | null = null
  private metrics: Partial<PerformanceMetrics> = {}
  private errorCount = 0
  private pageLoadStart = performance.now()

  constructor() {
    this.initializeWebVitals()
    this.initializeErrorTracking()
    this.initializeNavigationTracking()
  }

  // Core Web Vitals Monitoring
  private initializeWebVitals() {
    if (typeof window === 'undefined') return

    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) {
        this.metrics.largest_contentful_paint = lastEntry.startTime
        this.reportMetric('LCP', lastEntry.startTime)
      }
    })

    // First Input Delay (FID)
    this.observeMetric('first-input', (entries) => {
      const firstEntry = entries[0] as PerformanceEventTiming
      if (firstEntry && 'processingStart' in firstEntry) {
        this.metrics.first_input_delay = firstEntry.processingStart - firstEntry.startTime
        this.reportMetric('FID', this.metrics.first_input_delay)
      }
    })

    // Cumulative Layout Shift (CLS)
    this.observeMetric('layout-shift', (entries) => {
      let clsValue = 0
      for (const entry of entries) {
        const layoutShiftEntry = entry as any
        if (layoutShiftEntry && !layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value || 0
        }
      }
      this.metrics.cumulative_layout_shift = clsValue
      this.reportMetric('CLS', clsValue)
    })

    // Additional metrics
    this.observeMetric('paint', (entries) => {
      for (const entry of entries) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.first_contentful_paint = entry.startTime
          this.reportMetric('FCP', entry.startTime)
        }
      }
    })

    // Navigation timing
    this.observeMetric('navigation', (entries) => {
      const entry = entries[0] as PerformanceNavigationTiming
      this.metrics.time_to_first_byte = entry.responseStart - entry.requestStart
      this.metrics.page_load_time = entry.loadEventEnd - entry.fetchStart
      
      this.reportMetric('TTFB', this.metrics.time_to_first_byte)
      this.reportMetric('Page Load', this.metrics.page_load_time)
    })
  }

  private observeMetric(entryType: string, callback: (entries: PerformanceEntry[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })
      observer.observe({ entryTypes: [entryType] })
    } catch (error) {
      console.warn(`Performance observer for ${entryType} not supported:`, error)
    }
  }

  private reportMetric(name: string, value: number) {
    // Only report if the value is reasonable (not too high)
    if (value > 0 && value < 60000) { // Less than 60 seconds
      analyticsService.trackEvent({
        event_type: 'performance_metric',
        properties: {
          metric_name: name,
          metric_value: value,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          connection_type: this.getConnectionType(),
          device_memory: (navigator as any).deviceMemory,
          viewport_size: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }
      })
    }
  }

  // Error Tracking
  private initializeErrorTracking() {
    if (typeof window === 'undefined') return

    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError({
        error_type: 'javascript_error',
        error_message: event.message,
        stack_trace: event.error?.stack,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        severity: 'high',
        additional_context: {
          filename: event.filename,
          line_number: event.lineno,
          column_number: event.colno
        }
      })
    })

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        error_type: 'unhandled_promise_rejection',
        error_message: event.reason?.message || String(event.reason),
        stack_trace: event.reason?.stack,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        severity: 'medium'
      })
    })

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.reportError({
          error_type: 'resource_error',
          error_message: `Failed to load resource: ${(event.target as any)?.src || (event.target as any)?.href}`,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          severity: 'low',
          additional_context: {
            resource_type: (event.target as any)?.tagName,
            resource_url: (event.target as any)?.src || (event.target as any)?.href
          }
        })
      }
    }, true)
  }

  private async reportError(errorReport: ErrorReport) {
    this.errorCount++
    
    try {
      await analyticsService.trackEvent({
        event_type: 'error_occurred',
        properties: errorReport
      })

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Performance Monitor - Error reported:', errorReport)
      }

      // Send to external error tracking service (Sentry, LogRocket, etc.)
      if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        // Sentry integration would go here
      }
    } catch (error) {
      console.error('Failed to report error:', error)
    }
  }

  // Navigation and Page Timing
  private initializeNavigationTracking() {
    if (typeof window === 'undefined') return

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      analyticsService.trackEvent({
        event_type: 'page_visibility_change',
        properties: {
          visibility_state: document.visibilityState,
          page_url: window.location.href
        }
      })
    })

    // Track page unload
    window.addEventListener('beforeunload', () => {
      const sessionDuration = performance.now() - this.pageLoadStart
      analyticsService.trackEvent({
        event_type: 'page_unload',
        properties: {
          session_duration: sessionDuration,
          error_count: this.errorCount,
          page_url: window.location.href
        }
      })
    })
  }

  // API Performance Monitoring
  async monitorAPICall<T>(
    endpoint: string, 
    apiCall: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const startTime = performance.now()
    
    try {
      const result = await apiCall()
      const duration = performance.now() - startTime
      
      await analyticsService.trackEvent({
        event_type: 'api_call_success',
        properties: {
          endpoint,
          duration,
          ...metadata
        }
      })
      
      return result
    } catch (error) {
      const duration = performance.now() - startTime
      
      await analyticsService.trackEvent({
        event_type: 'api_call_error',
        properties: {
          endpoint,
          duration,
          error_message: error instanceof Error ? error.message : String(error),
          ...metadata
        }
      })
      
      throw error
    }
  }

  // User Interaction Monitoring
  monitorUserInteraction(elementName: string, interactionType: string = 'click') {
    const startTime = performance.now()
    
    return () => {
      const duration = performance.now() - startTime
      analyticsService.trackEvent({
        event_type: 'user_interaction',
        properties: {
          element_name: elementName,
          interaction_type: interactionType,
          response_time: duration,
          page_url: window.location.href
        }
      })
    }
  }

  // Performance Budget Monitoring
  checkPerformanceBudget(): {
    lcp_status: 'good' | 'needs_improvement' | 'poor'
    fid_status: 'good' | 'needs_improvement' | 'poor'
    cls_status: 'good' | 'needs_improvement' | 'poor'
    overall_score: number
  } {
    const lcpStatus = this.metrics.largest_contentful_paint ? 
      (this.metrics.largest_contentful_paint <= 2500 ? 'good' : 
       this.metrics.largest_contentful_paint <= 4000 ? 'needs_improvement' : 'poor') : 'good'

    const fidStatus = this.metrics.first_input_delay ?
      (this.metrics.first_input_delay <= 100 ? 'good' :
       this.metrics.first_input_delay <= 300 ? 'needs_improvement' : 'poor') : 'good'

    const clsStatus = this.metrics.cumulative_layout_shift ?
      (this.metrics.cumulative_layout_shift <= 0.1 ? 'good' :
       this.metrics.cumulative_layout_shift <= 0.25 ? 'needs_improvement' : 'poor') : 'good'

    const scores = { good: 3, needs_improvement: 2, poor: 1 }
    const totalScore = scores[lcpStatus] + scores[fidStatus] + scores[clsStatus]
    const overallScore = Math.round((totalScore / 9) * 100)

    return {
      lcp_status: lcpStatus,
      fid_status: fidStatus,
      cls_status: clsStatus,
      overall_score: overallScore
    }
  }

  // Memory Usage Monitoring
  getMemoryUsage(): {
    used_heap_size: number
    total_heap_size: number
    heap_size_limit: number
    usage_percentage: number
  } | null {
    if (typeof window === 'undefined' || !(performance as any).memory) {
      return null
    }

    const memory = (performance as any).memory
    return {
      used_heap_size: memory.usedJSHeapSize,
      total_heap_size: memory.totalJSHeapSize,
      heap_size_limit: memory.jsHeapSizeLimit,
      usage_percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
    }
  }

  // Network Information
  private getConnectionType(): string {
    if (typeof navigator === 'undefined') return 'unknown'
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    return connection?.effectiveType || 'unknown'
  }

  getNetworkInfo(): {
    connection_type: string
    downlink: number
    rtt: number
    save_data: boolean
  } | null {
    if (typeof navigator === 'undefined') return null
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (!connection) return null
    
    return {
      connection_type: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      save_data: connection.saveData || false
    }
  }

  // Real User Monitoring Report
  generateRUMReport(): {
    core_web_vitals: Partial<PerformanceMetrics>
    error_rate: number
    session_info: any
    network_info: any
    memory_usage: any
    performance_budget: any
  } {
    return {
      core_web_vitals: this.metrics,
      error_rate: this.errorCount,
      session_info: {
        session_duration: performance.now() - this.pageLoadStart,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        viewport_size: typeof window !== 'undefined' ? {
          width: window.innerWidth,
          height: window.innerHeight
        } : null
      },
      network_info: this.getNetworkInfo(),
      memory_usage: this.getMemoryUsage(),
      performance_budget: this.checkPerformanceBudget()
    }
  }

  // Send complete performance report
  async sendPerformanceReport() {
    const report = this.generateRUMReport()
    
    await analyticsService.trackEvent({
      event_type: 'performance_report',
      properties: {
        ...report,
        timestamp: new Date().toISOString()
      }
    })
  }

  // Cleanup
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// React Hook for Performance Monitoring
export function usePerformanceMonitor() {
  return {
    trackUserInteraction: performanceMonitor.monitorUserInteraction.bind(performanceMonitor),
    monitorAPICall: performanceMonitor.monitorAPICall.bind(performanceMonitor),
    getPerformanceReport: performanceMonitor.generateRUMReport.bind(performanceMonitor),
    sendReport: performanceMonitor.sendPerformanceReport.bind(performanceMonitor)
  }
}