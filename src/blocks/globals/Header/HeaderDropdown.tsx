'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from './Icons'

interface DropdownItem {
  label?: string | null
  link?: string | null
  icon?: string | null
  description?: string | null
  highlight?: boolean | null
  id?: string | null
}

interface HeaderDropdownProps {
  label: string
  items: DropdownItem[]
}

export default function HeaderDropdown({ label, items }: HeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen])

  // Render icon based on name
  const renderIcon = (iconName: string | null | undefined) => {
    if (!iconName) return null

    switch (iconName) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case 'settings':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case 'pages':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        )
      case 'docs':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      case 'blog':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        )
      case 'contact':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: 'var(--color-header-text)' }}
        className="flex items-center px-4 py-2 rounded-md text-lg font-medium
          transition-all duration-200 relative group"
        aria-expanded={isOpen}
      >
        <span className="relative z-10 flex items-center">
          {label}
          <ChevronDownIcon
            className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>

        {/* Hover background effect using accent colors */}
        <span
          className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity"
          style={{ background: 'var(--color-accent-secondary)' }}
        />
      </button>

      {/* Enhanced dropdown with animations */}
      {isOpen && (
        <div
          className="absolute left-0 mt-1 w-64 rounded-md shadow-lg py-1 z-10 overflow-hidden
                    animate-in fade-in slide-in-from-top-5 duration-300"
          style={{
            background: 'var(--color-bg-secondary)',
            borderLeft: '2px solid var(--color-accent-primary)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.link || '#'}
              style={{ color: 'var(--color-text-primary)' }}
              className={`block px-4 py-2.5 text-sm transition-colors relative group ${
                item.highlight ? 'bg-opacity-10 bg-accent-primary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start">
                {item.icon && (
                  <span className="mr-3 text-gray-400 mt-0.5">{renderIcon(item.icon)}</span>
                )}
                <div>
                  <span
                    className={`relative z-10 font-medium ${item.highlight ? 'text-accent-primary' : ''}`}
                    style={
                      item.highlight
                        ? { color: 'var(--color-accent-primary)' }
                        : { color: 'var(--color-text-primary)' }
                    }
                  >
                    {item.label}
                  </span>
                  {item.description && (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Hover background effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ background: 'var(--color-accent-primary)' }}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}