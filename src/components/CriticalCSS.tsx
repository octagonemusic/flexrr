'use client'

import { useEffect, useState } from 'react'

// This component inlines critical CSS for faster page renders
// while lazily loading non-critical styles
export default function CriticalCSS() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    try {
      // Load non-critical CSS asynchronously with error handling
      const nonCriticalCSS = document.createElement('link')
      nonCriticalCSS.rel = 'stylesheet'
      nonCriticalCSS.href = '/styles/non-critical.css'
      nonCriticalCSS.media = 'print'
      
      // Handle loading errors
      nonCriticalCSS.onerror = () => {
        console.warn('Non-critical CSS not found: /styles/non-critical.css');
        // The page will still work without the non-critical CSS
      }
      
      nonCriticalCSS.onload = () => {
        nonCriticalCSS.media = 'all'
      }
      
      document.head.appendChild(nonCriticalCSS)
    } catch (err) {
      console.warn('Error loading non-critical CSS:', err)
    }
  }, [])

  if (!mounted) return null

  return null
}