import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

export const revalidate = 60

// Social media icons
const SocialIcon = ({ platform, color }: { platform: string; color?: string }) => {
  const iconColor = color || 'currentColor'
  
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        )
      case 'twitter':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        )
      case 'instagram':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        )
      case 'youtube':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        )
      case 'github':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        )
      case 'discord':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
        )
      case 'tiktok':
        return (
          <svg fill={iconColor} viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <span className="text-gray-400 hover:text-gray-100 transition-colors duration-200">
      {getIcon(platform)}
    </span>
  )
}

export default async function FooterServer() {
  const payload = await getPayload({ config })

  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })

  // Make sure footer.logo is a Media object and not a string
  const logo = typeof footer?.logo === 'object' ? (footer.logo as Media) : null

  // Process copyright text to include the current year if needed
  const processCopyrightText = (text?: string | null): string => {
    if (!text) return `© ${new Date().getFullYear()} All rights reserved.`
    return text.replace('{year}', new Date().getFullYear().toString())
  }

  // Get footer container width classes
  const getContainerWidth = (width?: string | null): string => {
    switch (width) {
      case 'wide': return 'max-w-7xl'
      case 'narrow': return 'max-w-5xl'
      case 'standard':
      default: return 'max-w-6xl'
    }
  }
  
  // Get columns count for grid layout
  const getFooterColumnsClasses = () => {
    // Count actual navigation columns
    const navColumnCount = footer?.columns?.length || 0
    
    // Calculate total columns (logo column + nav columns + contact column if exists)
    const hasContactInfo = !!(footer?.contactInfo?.email || footer?.contactInfo?.phone || footer?.contactInfo?.address)
    const totalColumns = 1 + navColumnCount + (hasContactInfo ? 1 : 0)
    
    // Generate appropriate grid classes based on column count
    switch (totalColumns) {
      case 1: return 'md:grid-cols-1'
      case 2: return 'md:grid-cols-2'
      case 3: return 'md:grid-cols-3'
      case 4: return 'md:grid-cols-4'
      case 5: return 'md:grid-cols-5'
      default: return 'md:grid-cols-2' // Fallback
    }
  }

  // Get mobile column layout classes
  const getMobileColumnClasses = (layout?: string | null): string => {
    return layout === '2-cols' ? 'grid-cols-2 sm:grid-cols-2' : 'grid-cols-1'
  }

  // Prepare layout settings
  const style = footer?.layout?.style || 'standard'
  const columnsOnMobile = footer?.layout?.columnsOnMobile || 'stack'
  const containerWidth = getContainerWidth(footer?.layout?.width)
  const columnsClasses = getFooterColumnsClasses()
  const mobileColumnsClasses = getMobileColumnClasses(columnsOnMobile)
  
  // Determine if we have content for social icons
  const hasSocialLinks = footer?.socialMedia && footer.socialMedia.length > 0

  // Get layout specific classes
  const footerContainerClass = `${containerWidth} mx-auto px-4`
  let mainSectionClass = ''
  let footerGridClass = ''
  let logoColumnClass = ''
  let copyrightClass = ''
  
  if (style === 'minimal') {
    mainSectionClass = 'flex flex-col md:flex-row md:justify-between items-center py-8'
    copyrightClass = 'mt-6 md:mt-0 text-sm'
  } else if (style === 'expanded') {
    mainSectionClass = 'pt-16 pb-8'
    footerGridClass = `grid ${mobileColumnsClasses} ${columnsClasses} gap-8`
    logoColumnClass = 'col-span-1'
    copyrightClass = 'border-t border-gray-700 pt-6 pb-6 mt-8 text-sm'
  } else {
    // Default 'standard' layout
    mainSectionClass = 'pt-12 pb-6'
    footerGridClass = `grid ${mobileColumnsClasses} ${columnsClasses} gap-8`
    logoColumnClass = 'col-span-1'
    copyrightClass = 'border-t border-gray-700 pt-6 pb-6 mt-8 text-sm text-center'
  }

  return (
    <footer style={{ background: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }}>
      <div className={footerContainerClass}>
        <div className={mainSectionClass}>
          {/* Minimal layout uses a different structure */}
          {style === 'minimal' ? (
            <>
              <div className="flex items-center mb-6 md:mb-0">
                <div className="relative w-36 h-12">
                  {logo && typeof logo.url === 'string' && (
                    <Image
                      src={logo.url}
                      alt={logo.alt || 'Footer Logo'}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                <div className="hidden md:flex ml-10 space-x-6">
                  {footer?.columns?.flatMap((column) =>
                    column.links?.map((item, linkIdx) => (
                      <Link
                        key={`${column.title}-${linkIdx}`}
                        href={item.link || '#'}
                        target={item.newTab ? '_blank' : undefined}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        style={{ color: 'var(--color-footer-text-secondary)' }}
                        className="text-sm transition-colors duration-200 hover:text-opacity-100"
                      >
                        {item.label}
                      </Link>
                    )),
                  )}
                </div>
              </div>

              {hasSocialLinks && (
                <div className="flex items-center space-x-6">
                  {footer?.socialMedia?.map((social, index) => (
                    <a
                      key={index}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.platform}`}
                      className="hover:scale-110 transition-transform"
                    >
                      <SocialIcon platform={social.platform} color={social.color} />
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Standard and Expanded layouts use grid
            <div className={footerGridClass}>
              {/* Logo and Social Media Column */}
              <div className={`flex flex-col items-center md:items-start ${logoColumnClass}`}>
                <div className="relative w-40 h-16 mb-4">
                  {logo && typeof logo.url === 'string' && (
                    <Image
                      src={logo.url}
                      alt={logo.alt || 'Footer Logo'}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Social Media Icons */}
                {hasSocialLinks && (
                  <div className="flex gap-4 mt-4">
                    {footer?.socialMedia?.map((social, index) => (
                      <a
                        key={index}
                        href={social.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.platform}`}
                        className="hover:scale-110 transition-transform"
                      >
                        <SocialIcon platform={social.platform} color={social.color} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Columns */}
              {footer?.columns?.map((column, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start">
                  <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                  <nav className="flex flex-col space-y-2">
                    {column.links?.map((item, linkIdx) => (
                      <Link
                        key={linkIdx}
                        href={item.link || '#'}
                        target={item.newTab ? '_blank' : undefined}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        style={{ color: 'var(--color-footer-text-secondary)' }}
                        className="transition-colors duration-200 hover:text-opacity-100 relative group inline-block"
                      >
                        <span className="relative z-10">{item.label}</span>
                        {/* Subtle underline on hover using accent color */}
                        <span
                          className="absolute left-0 right-0 bottom-0 h-0.5 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"
                          style={{ background: 'var(--color-accent-primary)' }}
                        />
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}

              {/* Contact Column - If contact info exists */}
              {(footer?.contactInfo?.email || footer?.contactInfo?.phone || footer?.contactInfo?.address) && (
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="text-lg font-semibold mb-4">
                    {footer?.contactInfo?.title || 'Contact Us'}
                  </h3>
                  <div style={{ color: 'var(--color-footer-text-secondary)' }} className="space-y-2">
                    {footer?.contactInfo?.email && (
                      <p className="flex items-center">
                        <span className="inline-block mr-2">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                        <a
                          href={`mailto:${footer.contactInfo.email}`}
                          style={{ color: 'var(--color-accent-primary)' }}
                          className="hover:underline"
                        >
                          {footer.contactInfo.email}
                        </a>
                      </p>
                    )}

                    {footer?.contactInfo?.phone && (
                      <p className="flex items-center">
                        <span className="inline-block mr-2">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </span>
                        <a
                          href={`tel:${footer.contactInfo.phone}`}
                          style={{ color: 'var(--color-accent-primary)' }}
                          className="hover:underline"
                        >
                          {footer.contactInfo.phone}
                        </a>
                      </p>
                    )}

                    {footer?.contactInfo?.address && (
                      <p className="flex items-start">
                        <span className="inline-block mr-2 mt-1">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                        <span>{footer.contactInfo.address}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Copyright Notice */}
        <div
          className={copyrightClass}
          style={{ color: 'var(--color-footer-text-secondary)' }}
        >
          <p>
            {processCopyrightText(footer?.copyrightSettings?.copyrightText)}
            {footer?.copyrightSettings?.companyName &&
              ` ${footer.copyrightSettings.companyName}`}
          </p>
        </div>
      </div>
    </footer>
  )
}