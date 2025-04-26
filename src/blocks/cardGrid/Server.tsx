import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

interface CardProps {
  image: Media
  title: string
  description?: string | null
  link?: {
    text?: string | null
    url?: string | null
  } | null
}

interface CardGridProps {
  heading?: string | null
  description?: string | null
  layout?: 'default' | 'compact' | 'wide'
  cards: CardProps[]
}

export default function CardGridServer({
  heading,
  description,
  layout = 'default',
  cards,
}: CardGridProps) {
  const gridCols = {
    default: 'md:grid-cols-3',
    compact: 'md:grid-cols-4',
    wide: 'md:grid-cols-2',
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {(heading || description) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-5xl font-bold mb-6 mx-auto">
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {heading
                    .split(' ')
                    .slice(0, Math.ceil(heading.split(' ').length / 2))
                    .join(' ')}
                </span>{' '}
                <span style={{ color: 'var(--color-accent-primary)' }}>
                  {heading
                    .split(' ')
                    .slice(Math.ceil(heading.split(' ').length / 2))
                    .join(' ')}
                </span>
              </h2>
            )}
            {description && (
              <div className="flex justify-center">
                <p
                  className="text-xl max-w-3xl text-center"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Card Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[layout]} gap-8`}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md 
                overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: 'var(--color-bg-secondary)' }}
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                {card.image?.url && (
                  <Image
                    src={card.image.url}
                    alt={card.image.alt || card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {card.title}
                </h3>
                {card.description && (
                  <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {card.description}
                  </p>
                )}
                {card.link?.url && (
                  <Link
                    href={card.link.url}
                    className="inline-flex items-center font-medium transition-colors duration-200"
                    style={{ color: 'var(--color-accent-primary)' }}
                  >
                    {card.link.text || 'Learn More'}
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
