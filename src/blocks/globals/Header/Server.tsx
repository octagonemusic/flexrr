import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import MobileMenu from './MobileMenu'
import HeaderDropdown from './HeaderDropdown'

export const revalidate = 60

export default async function HeaderServer() {
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 2, // Increase depth to handle nested navigation
  })

  // Make sure header.logo is a Media object and not a string
  const logo = typeof header?.logo === 'object' ? (header.logo as Media) : null

  // Process navigation items to handle dropdowns
  // Ensure hasDropdown is strictly a boolean (not null or undefined)
  const navItems =
    header?.nav?.map((item) => {
      // Check if the item has a submenu property and it's an array with items
      const hasDropdown = !!(item.submenu && Array.isArray(item.submenu) && item.submenu.length > 0)
      return {
        ...item,
        hasDropdown, // Now this is guaranteed to be a boolean
      }
    }) || []

  return (
    <header
      style={{ background: 'var(--color-header-bg)' }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4">
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
          <nav className="hidden md:flex items-center space-x-1">
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

                  {/* Hover background effect using accent colors */}
                  <span
                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ background: 'var(--color-accent-secondary)' }}
                  />

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
                </Link>
              ),
            )}

            {/* Action Button (if configured) */}
            {header?.actionButton?.label && (
              <a
                href={header.actionButton.link || '#'}
                style={{
                  background: 'var(--color-accent-primary)',
                  color: 'var(--color-header-text)',
                }}
                className="ml-4 px-5 py-2 rounded-md text-base font-medium shadow-md
                  hover:opacity-90 transition-all duration-200 relative hover:shadow-lg
                  hover:translate-y-[-1px]"
              >
                {header.actionButton.label}
              </a>
            )}
          </nav>

          {/* Mobile Navigation Toggle (Client Component) */}
          <MobileMenu items={navItems} actionButton={header?.actionButton} />
        </div>
      </div>
    </header>
  )
}
