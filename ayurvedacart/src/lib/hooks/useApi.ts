import { useState, useEffect } from 'react'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string, options?: RequestInit): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers
          },
          ...options
        })

        const result: ApiResponse<T> = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'API request failed')
        }

        setState({
          data: result.data || null,
          loading: false,
          error: null
        })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        })
      }
    }

    fetchData()
  }, [url])

  return state
}

export function useProducts(filters?: Record<string, any>) {
  const params = new URLSearchParams()
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.append(key, value.join(','))
        } else {
          params.append(key, String(value))
        }
      }
    })
  }

  const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`
  return useApi<{ products: any[]; total: number }>(url)
}

export function useProduct(slug: string) {
  const url = slug ? `/api/products/${slug}` : ''
  return useApi<{ product: any; recommendations: any[] }>(url)
}

export function useSearch(query: string, filters?: Record<string, any>) {
  const [result, setResult] = useState<UseApiState<{ products: any[]; total: number; query: string }>>({
    data: null,
    loading: false,
    error: null
  })

  useEffect(() => {
    if (!query?.trim()) {
      setResult({ data: null, loading: false, error: null })
      return
    }

    const searchData = async () => {
      try {
        setResult(prev => ({ ...prev, loading: true, error: null }))

        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: query.trim(),
            filters: filters || {}
          })
        })

        const apiResult: ApiResponse<{ products: any[]; total: number; query: string }> = await response.json()

        if (!response.ok || !apiResult.success) {
          throw new Error(apiResult.error || 'Search failed')
        }

        setResult({
          data: apiResult.data || null,
          loading: false,
          error: null
        })
      } catch (error) {
        setResult({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Search failed'
        })
      }
    }

    const timeoutId = setTimeout(searchData, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [query, filters])

  return result
}

export function useOrders() {
  return useApi<any[]>('/api/orders')
}

export async function createOrder(orderData: any) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })

  const result: ApiResponse<any> = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Failed to create order')
  }

  return result.data
}

export async function updateOrderStatus(orderId: string, status: string) {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })

  const result: ApiResponse<any> = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Failed to update order')
  }

  return result.data
} 