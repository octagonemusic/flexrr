import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

export const revalidate = 60

export default async function FooterServer() {
  const payload = await getPayload({ config })

  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  // Make sure footer.logo is a Media object and not a string
  const logo = typeof footer?.logo === 'object' ? (footer.logo as Media) : null

  return (
    <footer
      style={{ background: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }}
      className="pt-10 pb-6"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Copyright Column */}
          <div className="flex flex-col items-center md:items-start">
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
            <p style={{ color: 'var(--color-footer-text-secondary)' }} className="text-sm mt-2">
              {footer?.copyrightNotice || `© ${new Date().getFullYear()} All rights reserved.`}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {footer?.nav?.map((item, index) => (
                <Link
                  key={index}
                  href={item.link || '#'}
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

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p style={{ color: 'var(--color-footer-text-secondary)' }}>
              Have questions or feedback?
              <br />
              <a
                href="mailto:contact@example.com"
                style={{ color: 'var(--color-accent-primary)' }}
                className="inline-block transition-colors duration-200 hover:opacity-80 relative"
              >
                contact@example.com
              </a>
            </p>
            {/* Social Icons... */}
          </div>
        </div>

        <div
          className="border-t border-gray-700 pt-6 mt-6 text-center text-sm"
          style={{ color: 'var(--color-footer-text-secondary)' }}
        >
          <p>
            Designed with <span className="text-red-500">❤️</span> for flexrr
          </p>
        </div>
      </div>
    </footer>
  )
}
