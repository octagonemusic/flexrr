'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MenuIcon, ChevronDownIcon, XIcon } from './Icons'

interface NavItem {
  label?: string | null
  link?: string | null
  hasDropdown?: boolean
  submenu?: Array<{
    label?: string | null
    link?: string | null
    description?: string | null
    icon?: string | null
    highlight?: boolean | null
    id?: string | null
  }> | null
  badge?: string | null
  badgeColor?: string | null
}

interface ActionButton {
  label?: string | null
  link?: string | null
  variant?: string | null
  icon?: string | null
  newTab?: boolean | null
}

interface MobileMenuProps {
  items: NavItem[]
  actionButton?: ActionButton | null
}

export default function MobileMenu({ items, actionButton }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const toggleSubmenu = (index: number) => {
    setOpenSubmenu(openSubmenu === index ? null : index)
  }

  // Helper function to get badge color
  const getBadgeColor = (color: string | null | undefined) => {
    if (!color) return 'var(--color-accent-secondary)'
    
    switch (color) {
      case 'primary': return 'var(--color-accent-primary)'
      case 'secondary': return 'var(--color-accent-secondary)'
      case 'success': return '#10b981'
      case 'danger': return '#ef4444'
      case 'warning': return '#f59e0b'
      case 'info': return '#3b82f6'
      default: return color // Assume it's a custom color
    }
  }

  // Render icon helper
  const renderIcon = (iconName: string | null | undefined) => {
    if (!iconName) return null

    switch (iconName) {
      case 'arrow-right':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )
      case 'download':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-white hover:bg-opacity-20 transition-colors relative group"
        aria-expanded={isOpen}
        aria-label="Toggle mobile menu"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <XIcon className="h-6 w-6 relative z-10" />
        ) : (
          <MenuIcon className="h-6 w-6 relative z-10" />
        )}

        {/* Hover background effect */}
        <span
          className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity"
          style={{ background: 'var(--color-accent-secondary)' }}
        />
      </button>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto pt-20 pb-12 px-4 animate-in fade-in duration-200"
          style={{ background: 'var(--color-bg-primary)' }}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={() => setIsOpen(false)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none relative group"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6 relative z-10" />

              {/* Hover background effect */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ background: 'var(--color-accent-secondary)' }}
              />
            </button>
          </div>

          <nav className="mt-2 space-y-1">
            {items.map((item, index) => (
              <div key={index} className="animate-in slide-in-from-right duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                {item.hasDropdown ? (
                  <div className="mb-2">
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="w-full flex justify-between items-center px-3 py-3 rounded-md text-lg font-medium mb-1 relative group"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span className="flex items-center relative z-10">
                        {item.label}
                        {item.badge && (
                          <span
                            className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full"
                            style={{
                              background: getBadgeColor(item.badgeColor),
                              color: 'var(--color-header-text)',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform relative z-10 ${openSubmenu === index ? 'rotate-180' : ''}`}
                      />

                      {/* Hover background effect */}
                      <span
                        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity"
                        style={{ background: 'var(--color-accent-primary)' }}
                      />
                    </button>
                    {openSubmenu === index && (
                      <div className="pl-4 space-y-1 mb-2 animate-in slide-in-from-top duration-200">
                        {item.submenu?.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.link || '#'}
                            style={{ 
                              color: subItem.highlight 
                                ? 'var(--color-accent-primary)' 
                                : 'var(--color-text-secondary)' 
                            }}
                            className="block px-3 py-2 rounded-md text-base font-medium relative group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center">
                              {/* Icon if present */}
                              {subItem.icon && (
                                <span className="mr-2 text-gray-400 flex items-center">
                                  {renderMobileIcon(subItem.icon)}
                                </span>
                              )}
                              <div>
                                <span className="relative z-10">{subItem.label}</span>
                                {subItem.description && (
                                  <p className="text-xs opacity-70 mt-0.5">{subItem.description}</p>
                                )}
                              </div>
                            </div>

                            {/* Hover background effect */}
                            <span
                              className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity"
                              style={{ background: 'var(--color-accent-secondary)' }}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.link || '#'}
                    className="flex items-center px-3 py-3 rounded-md text-lg font-medium relative group"
                    style={{ color: 'var(--color-text-primary)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10 flex items-center">
                      {item.label}
                      {item.badge && (
                        <span
                          className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full"
                          style={{
                            background: getBadgeColor(item.badgeColor),
                            color: 'var(--color-header-text)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </span>

                    {/* Hover background effect */}
                    <span
                      className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ background: 'var(--color-accent-primary)' }}
                    />
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile action button */}
            {actionButton?.label && (
              <div className="pt-6 pb-3 animate-in slide-in-from-bottom duration-200">
                <a
                  href={actionButton.link || '#'}
                  target={actionButton.newTab ? '_blank' : undefined}
                  rel={actionButton.newTab ? 'noopener noreferrer' : undefined}
                  style={{
                    background: actionButton.variant === 'primary' || !actionButton.variant 
                      ? 'var(--color-accent-primary)' 
                      : 'transparent',
                    color: 'var(--color-header-text)',
                    border: actionButton.variant === 'outline' || actionButton.variant === 'secondary' 
                      ? '2px solid var(--color-header-text)' 
                      : 'none',
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-medium shadow-md
                    hover:opacity-90 transition-all duration-200 hover:shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {actionButton.icon && (
                    <span className="mr-2">
                      {renderIcon(actionButton.icon)}
                    </span>
                  )}
                  {actionButton.label}
                </a>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

// Helper function for mobile menu icons
function renderMobileIcon(iconName: string) {
  switch (iconName) {
    case 'home':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'settings':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'user':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    case 'docs':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'blog':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    default:
      return null
  }
}