import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import MobileMenu from './MobileMenu'
import HeaderDropdown from './HeaderDropdown'

export const revalidate = 60

// Helper component for the Top Announcement Bar
const TopBar = ({ topBar }: { topBar: { 
  enabled?: boolean;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
} }) => {
  if (!topBar?.enabled) return null

  // Get background color class or use custom value
  const getBgColor = (color: string | null | undefined) => {
    if (!color) return 'var(--color-accent-primary)'
    
    // Handle predefined colors
    switch (color) {
      case 'primary':
        return 'var(--color-accent-primary)'
      case 'secondary':
        return 'var(--color-accent-secondary)'
      default:
        // Assume it's a hex value or CSS variable
        return color
    }
  }

  return (
    <div 
      className="py-2 px-4 text-center text-sm font-medium" 
      style={{ 
        background: getBgColor(topBar.backgroundColor),
        color: 'var(--color-header-text)'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        <div>{topBar.text}</div>
        {topBar.ctaText && (
          <a 
            href={topBar.ctaLink || '#'} 
            className="inline-flex items-center underline hover:no-underline mt-1 sm:mt-0"
          >
            {topBar.ctaText}
            <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default async function HeaderServer() {
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  // Make sure header.logo is a Media object and not a string
  const logo = typeof header?.logo === 'object' ? (header.logo as Media) : null

  // Get container width class based on settings
  const getContainerWidthClass = () => {
    const width = header?.layout?.containerWidth || 'standard'
    switch (width) {
      case 'wide':
        return 'max-w-7xl'
      case 'narrow':
        return 'max-w-5xl'
      case 'full':
        return 'w-full px-6'
      case 'standard':
      default:
        return 'max-w-6xl'
    }
  }

  // Get mobile breakpoint class
  const getMobileBreakpoint = () => {
    const breakpoint = header?.layout?.mobileBreakpoint || 'md'
    return breakpoint
  }

  // Get header variant class
  const getHeaderClasses = () => {
    const variant = header?.layout?.variant || 'standard'
    const isSticky = header?.layout?.sticky !== false
    const baseClasses = isSticky ? 'sticky top-0 z-50' : 'relative z-50'
    
    switch (variant) {
      case 'transparent':
        return `${baseClasses} bg-transparent transition-all duration-300`
      case 'centered':
        return `${baseClasses} shadow-md`
      case 'minimal':
        return `${baseClasses} py-2`
      case 'standard':
      default:
        return `${baseClasses} shadow-md`
    }
  }

  // Process navigation items to handle dropdowns
  const navItems =
    header?.nav?.map((item) => {
      const hasDropdown = !!(item.submenu && Array.isArray(item.submenu) && item.submenu.length > 0)
      return {
        ...item,
        hasDropdown,
      }
    }) || []

  // Helper functions for mobile breakpoint
  const bp = getMobileBreakpoint()
  const mobileHideClass = `hidden ${bp}:flex`
  const desktopHideClass = `${bp}:hidden`

  return (
    <>
      {/* Top Announcement Bar - if enabled */}
      {header?.topBar?.enabled && <TopBar topBar={header.topBar} />}

      {/* Main Header */}
      <header
        style={{ background: 'var(--color-header-bg)' }}
        className={getHeaderClasses()}
      >
        <div className={`${getContainerWidthClass()} mx-auto px-4`}>
          {header?.layout?.variant === 'centered' ? (
            // Centered Header Layout
            <div className="flex flex-col items-center">
              {/* Logo Section */}
              <div className="flex-shrink-0 relative w-40 h-16 py-2">
                <Link href="/" className="block">
                  {logo && typeof logo.url === 'string' && (
                    <Image
                      src={logo.url}
                      alt={logo.alt || 'Logo'}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </Link>
              </div>

              {/* Navigation */}
              <nav className={`${mobileHideClass} items-center pb-2`}>
                {navItems.map((item, index) =>
                  item.hasDropdown ? (
                    <HeaderDropdown key={index} label={item.label || ''} items={item.submenu || []} />
                  ) : (
                    <Link
                      key={index}
                      href={item.link || '#'}
                      style={{ color: 'var(--color-header-text)' }}
                      className="px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
                        hover:text-opacity-100 hover:bg-opacity-20 relative group"
                    >
                      <span className="relative z-10">{item.label}</span>

                      {/* Badge if present */}
                      {item.badge && (
                        <span
                          className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full"
                          style={{
                            background: item.badgeColor === 'primary' 
                              ? 'var(--color-accent-primary)' 
                              : item.badgeColor === 'secondary'
                                ? 'var(--color-accent-secondary)'
                                : getBadgeColor(item.badgeColor),
                            color: 'var(--color-header-text)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Hover background effect */}
                      <span
                        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity"
                        style={{ background: 'var(--color-accent-secondary)' }}
                      />
                    </Link>
                  )
                )}
              </nav>

              {/* Mobile Menu Toggle (Centered version) */}
              <div className={`${desktopHideClass} absolute right-4 top-4`}>
                <MobileMenu items={navItems} actionButton={header?.buttons?.[0]} />
              </div>
            </div>
          ) : (
            // Default Layout with logo at left, nav at right
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex-shrink-0 relative w-40 h-16">
                <Link href="/" className="block">
                  {logo && typeof logo.url === 'string' && (
                    <Image
                      src={logo.url}
                      alt={logo.alt || 'Logo'}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className={`${mobileHideClass} items-center space-x-1`}>
                {navItems.map((item, index) =>
                  item.hasDropdown ? (
                    <HeaderDropdown key={index} label={item.label || ''} items={item.submenu || []} />
                  ) : (
                    <Link
                      key={index}
                      href={item.link || '#'}
                      style={{ color: 'var(--color-header-text)' }}
                      className="px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
                        hover:text-opacity-100 hover:bg-opacity-20 relative group"
                    >
                      <span className="relative z-10">{item.label}</span>

                      {/* Hover background effect */}
                      <span
                        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity"
                        style={{ background: 'var(--color-accent-secondary)' }}
                      />

                      {/* Badge if present */}
                      {item.badge && (
                        <span
                          className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full"
                          style={{
                            background: item.badgeColor === 'primary' 
                              ? 'var(--color-accent-primary)' 
                              : item.badgeColor === 'secondary'
                                ? 'var(--color-accent-secondary)'
                                : getBadgeColor(item.badgeColor),
                            color: 'var(--color-header-text)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                )}

                {/* Action Buttons */}
                {header?.buttons?.map((button, index) => {
                  // Different button styles
                  const getButtonClasses = () => {
                    switch (button.variant) {
                      case 'secondary': 
                        return 'border-2 border-current hover:bg-white/10'
                      case 'text':
                        return 'hover:underline'
                      case 'outline':
                        return 'border border-current hover:bg-white/10'
                      case 'primary':
                      default:
                        return 'shadow-md hover:opacity-90 hover:shadow-lg hover:translate-y-[-1px]'
                    }
                  }

                  const getButtonStyle = () => {
                    if (button.variant === 'primary') {
                      return {
                        background: 'var(--color-accent-primary)',
                        color: 'var(--color-header-text)',
                      }
                    }
                    return { color: 'var(--color-header-text)' }
                  }

                  return (
                    <a
                      key={index}
                      href={button.link || '#'}
                      target={button.newTab ? '_blank' : undefined}
                      rel={button.newTab ? 'noopener noreferrer' : undefined}
                      style={getButtonStyle()}
                      className={`ml-4 px-5 py-2 rounded-md text-base font-medium 
                        transition-all duration-200 relative flex items-center ${getButtonClasses()}`}
                    >
                      {button.icon && (
                        <span className="mr-2">
                          {renderIcon(button.icon)}
                        </span>
                      )}
                      {button.label}
                    </a>
                  )
                })}
              </nav>

              {/* Mobile Navigation Toggle */}
              <div className={desktopHideClass}>
                <MobileMenu 
                  items={navItems} 
                  actionButton={
                    header?.buttons && header.buttons.length > 0 
                      ? header.buttons[0] 
                      : undefined
                  } 
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

// Helper function to get badge color
function getBadgeColor(color: string | null | undefined) {
  if (!color) return 'var(--color-accent-secondary)'
  
  switch (color) {
    case 'success': return '#10b981'
    case 'danger': return '#ef4444'
    case 'warning': return '#f59e0b'
    case 'info': return '#3b82f6'
    default: return color // Assume it's a custom color
  }
}

// Helper function to render an icon
function renderIcon(iconName: string) {
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
    case 'login':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      )
    default:
      return null
  }
}