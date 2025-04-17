import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

export const revalidate = 60

export default async function HeaderServer() {
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 1,
  })

  // Make sure header.logo is a Media object and not a string
  const logo = typeof header?.logo === 'object' ? (header.logo as Media) : null

  return (
    <header style={{ background: 'var(--color-header-bg)' }} className="shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 relative w-40 h-16">
            {logo && typeof logo.url === 'string' && (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* Navigation Section */}
          <nav className="flex">
            {header?.nav?.map((item, index) => (
              <Link
                key={index}
                href={item.link || '#'}
                style={{ color: 'var(--color-header-text)' }}
                className="hover:text-blue-100 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
