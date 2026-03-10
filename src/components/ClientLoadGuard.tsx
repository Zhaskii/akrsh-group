'use client'

import React, { useEffect, useState } from 'react'
import AppLoader from './AppLoader'

const MIN_LOADER_MS = 600

export default function ClientLoadGuard({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const start = Date.now()

    const tryFinish = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed)
      setTimeout(() => setIsReady(true), remaining)
    }

    if (typeof document === 'undefined') {
      tryFinish()
      return
    }

    if (document.readyState === 'complete') {
      tryFinish()
      return
    }

    const onLoad = () => tryFinish()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  if (!isReady) {
    return <AppLoader />
  }

  return <>{children}</>
}
