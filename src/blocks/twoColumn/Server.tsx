import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { serialize } from '@/utils/serialize'
import { LexicalDocument } from '@/utils/serialize' // Add this import

interface ButtonProps {
  label?: string | null
  link?: string | null
  variant?: 'primary' | 'secondary'
}

interface TextContentProps {
  heading?: string | null
  content?: LexicalDocument // Change from any to LexicalDocument
  button?: ButtonProps | null
}

interface MediaContentProps {
  type?: 'image' | 'video'
  image?: Media | null
  video?: Media | null
}

interface ColumnContentProps {
  contentType: 'text' | 'media'
  text?: TextContentProps | null
  media?: MediaContentProps | null
}

interface TwoColumnProps {
  layout: {
    contentRatio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70'
    verticalAlignment?: 'start' | 'center' | 'end'
    spacing?: 'compact' | 'medium' | 'spacious'
    reverseOnMobile?: boolean
  }
  leftColumn: ColumnContentProps
  rightColumn: ColumnContentProps
}

const columnRatios = {
  '50-50': ['w-full lg:w-1/2', 'w-full lg:w-1/2'],
  '60-40': ['w-full lg:w-3/5', 'w-full lg:w-2/5'],
  '40-60': ['w-full lg:w-2/5', 'w-full lg:w-3/5'],
  '70-30': ['w-full lg:w-7/12', 'w-full lg:w-5/12'],
  '30-70': ['w-full lg:w-5/12', 'w-full lg:w-7/12'],
}

const spacingClasses = {
  compact: 'py-8 gap-4',
  medium: 'py-16 gap-8',
  spacious: 'py-24 gap-12',
}

export default function TwoColumnServer({ layout, leftColumn, rightColumn }: TwoColumnProps) {
  const [leftWidth, rightWidth] = columnRatios[layout.contentRatio || '50-50']
  const spacingClass = spacingClasses[layout.spacing || 'medium']

  const renderContent = (column: ColumnContentProps, columnWidth: string) => {
    if (column.contentType === 'text' && column.text) {
      return (
        <div className={`${columnWidth} flex flex-col`}>
          {column.text.heading && (
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {column.text.heading}
            </h2>
          )}
          {column.text.content && (
            <div
              className="prose prose-lg prose-invert mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {serialize(column.text.content)}
            </div>
          )}
          {column.text.button?.label && (
            <Link
              href={column.text.button.link || '#'}
              className={`inline-flex items-center px-6 py-3 rounded-md text-lg font-medium 
                transition-all duration-300 ${
                  column.text.button.variant === 'primary'
                    ? 'hover:opacity-90 hover:scale-105'
                    : 'border-2 border-current hover:bg-white/10'
                }`}
              style={{
                background:
                  column.text.button.variant === 'primary'
                    ? 'var(--color-accent-primary)'
                    : 'transparent',
                color: 'var(--color-text-primary)',
              }}
            >
              {column.text.button.label}
            </Link>
          )}
        </div>
      )
    }

    if (column.contentType === 'media' && column.media) {
      return (
        <div className={`${columnWidth} relative`}>
          {column.media.type === 'image' && column.media.image?.url && (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={column.media.image.url}
                alt={column.media.image.alt || ''}
                fill
                className="object-cover"
              />
            </div>
          )}
          {column.media.type === 'video' && column.media.video?.url && (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                <source
                  src={column.media.video.url}
                  type={column.media.video.mimeType || undefined}
                />
              </video>
            </div>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <section className={`px-4 ${spacingClass}`}>
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row items-${
            layout.verticalAlignment || 'center'
          } gap-8 lg:gap-12 ${layout.reverseOnMobile ? 'flex-col-reverse lg:flex-row' : ''}`}
        >
          {renderContent(leftColumn, leftWidth)}
          {renderContent(rightColumn, rightWidth)}
        </div>
      </div>
    </section>
  )
}
