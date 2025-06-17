'use client'

import { useEffect } from 'react'
import { useAuth } from '@/store/auth'

export function AuthInitializer() {
  const initialize = useAuth((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return null
} 