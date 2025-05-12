import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import styles from './Hero.module.css'

interface Button {
  label?: string
  link?: string
  variant?: 'primary' | 'secondary'
}

interface HeroProps {
  background: {
    type: 'image' | 'video'
    image?: Media | string
    video?: Media | string
    overlay?: boolean
  }
  layout: {
    contentAlignment: 'left' | 'center' | 'right'
    verticalAlignment: 'start' | 'center' | 'end'
    contentWidth: 'narrow' | 'medium' | 'wide'
  }
  content: {
    heading?: string
    subheading?: string
    buttons?: Button[]
  }
}

export default function HeroBlockServer({ background, layout, content }: HeroProps) {
  const containerClasses = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
  }

  const getHorizontalAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
    switch (alignment) {
      case 'left':
        return 'justify-start'
      case 'center':
        return 'justify-center'
      case 'right':
        return 'justify-end'
      default:
        return 'justify-center'
    }
  }

  const getVerticalAlignmentClass = (alignment: 'start' | 'center' | 'end') => {
    switch (alignment) {
      case 'start':
        return 'items-start'
      case 'center':
        return 'items-center'
      case 'end':
        return 'items-end'
      default:
        return 'items-center'
    }
  }

  return (
    <section
      className={`relative min-h-[75vh] flex overflow-hidden
        ${getVerticalAlignmentClass(layout.verticalAlignment)}
        ${getHorizontalAlignmentClass(layout.contentAlignment)}`}
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {background.type === 'image' ? (
          typeof background.image === 'object' && background.image ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={background.image.url || ''}
                alt=""
                fill
                className={`object-cover ${styles.zoomEffect}`}
                priority
                sizes="100vw"
                quality={85}
                fetchPriority="high"
                loading="eager"
              />
            </div>
          ) : null
        ) : typeof background.video === 'object' && background.video ? (
          <div className="relative w-full h-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover ${styles.zoomEffect}`}
            >
              {background.video?.url ? (
                <source src={background.video.url} type={background.video.mimeType || undefined} />
              ) : null}
            </video>
          </div>
        ) : null}
      </div>

      {/* Dark Overlay - Only shown if overlay is true */}
      {background.overlay && (
        <div
          className="absolute inset-0 w-full h-full z-[1]"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            opacity: 0.7,
          }}
        />
      )}

      {/* Content */}
      <div className="relative w-full px-4 z-10">
        <div
          className={`
            ${containerClasses[layout.contentWidth]}
            ${layout.contentAlignment === 'left' ? 'ml-0 mr-auto' : ''}
            ${layout.contentAlignment === 'center' ? 'mx-auto' : ''}
            ${layout.contentAlignment === 'right' ? 'ml-auto mr-0' : ''}
            ${layout.contentAlignment === 'left' ? 'text-left' : ''}
            ${layout.contentAlignment === 'center' ? 'text-center' : ''}
            ${layout.contentAlignment === 'right' ? 'text-right' : ''}
            w-full
          `}
        >
          {content.heading && (
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight leading-tight ${styles.slideDown}`}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {content.heading}
            </h1>
          )}
          {content.subheading && (
            <p
              className={`text-lg md:text-xl lg:text-2xl mb-16 md:mb-20 leading-relaxed ${styles.fadeIn} ${styles.delayShort}`}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {content.subheading}
            </p>
          )}
          {content.buttons && content.buttons.length > 0 && (
            <div
              className={`flex flex-wrap gap-4 ${styles.slideUp} ${styles.delayMedium}
                ${
                  layout.contentAlignment === 'center'
                    ? 'justify-center'
                    : layout.contentAlignment === 'right'
                      ? 'justify-end'
                      : 'justify-start'
                }`}
            >
              {content.buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.link || '#'}
                  className={`px-8 py-3 rounded-md text-lg font-medium transition-all duration-300
                    ${
                      button.variant === 'primary'
                        ? 'bg-accent-primary hover:opacity-90 hover:scale-105'
                        : 'border-2 border-current hover:bg-white/10 hover:scale-105'
                    }`}
                  style={{
                    background:
                      button.variant === 'primary' ? 'var(--color-accent-primary)' : 'transparent',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
