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
  }> | null
  badge?: string | null
}

interface ActionButton {
  label?: string | null
  link?: string | null
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

  const toggleSubmenu = (index: number) => {
    setOpenSubmenu(openSubmenu === index ? null : index)
  }

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-white hover:bg-opacity-20 transition-colors relative group"
        aria-expanded="false"
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
          className="fixed inset-0 z-50 overflow-y-auto pt-20 pb-12 px-4"
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
              <div key={index}>
                {item.hasDropdown ? (
                  <>
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
                              background: 'var(--color-accent-secondary)',
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
                      <div className="pl-4 space-y-1 mb-2">
                        {item.submenu?.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.link || '#'}
                            style={{ color: 'var(--color-text-secondary)' }}
                            className="block px-3 py-2 rounded-md text-base font-medium relative group"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="relative z-10">{subItem.label}</span>

                            {/* Hover background effect */}
                            <span
                              className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity"
                              style={{ background: 'var(--color-accent-secondary)' }}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
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
                            background: 'var(--color-accent-secondary)',
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
              <div className="pt-4 pb-3">
                <a
                  href={actionButton.link || '#'}
                  style={{
                    background: 'var(--color-accent-primary)',
                    color: 'var(--color-header-text)',
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-md text-base font-medium shadow-md
                    hover:opacity-90 transition-all duration-200 hover:shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
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
