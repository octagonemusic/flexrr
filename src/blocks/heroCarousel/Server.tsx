'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { useCallback, useEffect, useState } from 'react'
import styles from './HeroCarousel.module.css'

interface Button {
  label?: string
  link?: string
  variant?: 'primary' | 'secondary'
}

interface Slide {
  background: {
    type: 'image' | 'video'
    image?: Media | string
    video?: Media | string
    overlay?: boolean
  }
  content: {
    heading?: string
    subheading?: string
    buttons?: Button[]
  }
}

interface HeroCarouselProps {
  slides: Slide[]
  settings: {
    autoplay: boolean
    interval: number
    showArrows: boolean
    showDots: boolean
    layout: {
      contentAlignment: 'left' | 'center' | 'right'
      contentWidth: 'narrow' | 'medium' | 'wide'
    }
  }
}

export default function HeroCarouselServer({ slides, settings }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const containerClasses = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  useEffect(() => {
    if (settings.autoplay) {
      const timer = setInterval(() => {
        nextSlide()
      }, settings.interval * 1000)

      return () => clearInterval(timer)
    }
  }, [currentSlide, settings.autoplay, settings.interval, nextSlide])

  return (
    <section className="relative h-[75vh] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500
              ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Media */}
            {slide.background.type === 'image' ? (
              typeof slide.background.image === 'object' && slide.background.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={slide.background.image.url || ''}
                    alt=""
                    fill
                    className={`object-cover ${styles.zoomEffect} z-0`} // Added z-0
                    priority={index === 0}
                    sizes="100vw"
                    quality={80}
                  />
                </div>
              ) : null
            ) : null}

            {/* Overlay */}
            {slide.background.overlay && (
              <div
                className="absolute inset-0 w-full h-full z-[1]" // Change z-index to be between background and content
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  opacity: 0.7,
                }}
              />
            )}

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-[2]">
              {' '}
              {/* Changed to absolute and higher z-index */}
              <div className="w-full px-4">
                <div
                  className={`
                    ${containerClasses[settings.layout.contentWidth]}
                    ${settings.layout.contentAlignment === 'left' ? 'ml-0 mr-auto text-left' : ''}
                    ${settings.layout.contentAlignment === 'center' ? 'mx-auto text-center' : ''}
                    ${settings.layout.contentAlignment === 'right' ? 'ml-auto mr-0 text-right' : ''}
                    w-full
                  `}
                >
                  {slide.content.heading && (
                    <h1
                      className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight leading-tight
                        ${index === currentSlide ? styles.slideDown : ''}`}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {slide.content.heading}
                    </h1>
                  )}
                  {slide.content.subheading && (
                    <p
                      className={`text-lg md:text-xl lg:text-2xl mb-16 md:mb-20 leading-relaxed
                        ${index === currentSlide ? `${styles.fadeIn} ${styles.delayShort}` : ''}`}
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {slide.content.subheading}
                    </p>
                  )}
                  {slide.content.buttons && slide.content.buttons.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-4 
                        ${index === currentSlide ? `${styles.slideUp} ${styles.delayMedium}` : ''}
                        ${
                          settings.layout.contentAlignment === 'center'
                            ? 'justify-center'
                            : settings.layout.contentAlignment === 'right'
                              ? 'justify-end'
                              : 'justify-start'
                        }`}
                    >
                      {slide.content.buttons.map((button, buttonIndex) => (
                        <Link
                          key={buttonIndex}
                          href={button.link || '#'}
                          className={`px-8 py-3 rounded-md text-lg font-medium transition-all duration-300
                            ${
                              button.variant === 'primary'
                                ? 'bg-accent-primary hover:opacity-90 hover:scale-105'
                                : 'border-2 border-current hover:bg-white/10 hover:scale-105'
                            }`}
                          style={{
                            background:
                              button.variant === 'primary'
                                ? 'var(--color-accent-primary)'
                                : 'transparent',
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
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {settings.showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 
              text-white hover:bg-black/50 transition-colors cursor-pointer md:p-3 lg:p-4"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 
              text-white hover:bg-black/50 transition-colors cursor-pointer md:p-3 lg:p-4"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {settings.showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors cursor-pointer
                ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
