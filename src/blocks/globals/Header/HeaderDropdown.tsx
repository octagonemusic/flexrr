'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from './Icons'

interface DropdownItem {
  label?: string | null
  link?: string | null
  icon?: string | null
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

      {isOpen && (
        <div
          className="absolute left-0 mt-1 w-48 rounded-md shadow-lg py-1 z-10"
          style={{
            background: 'var(--color-bg-secondary)',
            borderLeft: '2px solid var(--color-accent-primary)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.link || '#'}
              style={{ color: 'var(--color-text-primary)' }}
              className="block px-4 py-2 text-sm transition-colors relative group"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">{item.label}</span>

              {/* Hover background effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ background: 'var(--color-accent-primary)' }}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
