import { Metadata } from 'next'
import { getSiteSettings } from './getSiteSettings'
import { Media } from '@/payload-types'

interface PageSEO {
  title?: string
  description?: string
  image?: string | Media
  noIndex?: boolean
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
  }
  keywords?: string[]
}

export async function generateMetadata(pageSEO?: PageSEO): Promise<Metadata> {
  const siteSettings = await getSiteSettings()

  // Default site data
  const siteName = siteSettings?.generalSettings?.siteName || 'Your Site'
  const siteDescription = siteSettings?.generalSettings?.siteDescription || ''
  const suffix = siteSettings?.seoSettings?.metaTitleSuffix || ''
  const indexingEnabled = siteSettings?.seoSettings?.indexingEnabled !== false

  // Default OG image
  let ogImageUrl = ''
  let ogImageWidth: number | undefined
  let ogImageHeight: number | undefined
  let ogImageAlt = siteName
  
  if (
    siteSettings?.generalSettings?.ogImage &&
    typeof siteSettings.generalSettings.ogImage === 'object'
  ) {
    const ogImage = siteSettings.generalSettings.ogImage as Media
    ogImageUrl = ogImage.url || ''
    ogImageWidth = ogImage.width || 1200
    ogImageHeight = ogImage.height || 630
    ogImageAlt = ogImage.alt || siteName
  }

  // Page-specific OG image if available
  if (pageSEO?.image) {
    if (typeof pageSEO.image === 'object' && 'url' in pageSEO.image) {
      const pageImage = pageSEO.image as Media
      ogImageUrl = pageImage.url || ogImageUrl
      ogImageWidth = pageImage.width || ogImageWidth
      ogImageHeight = pageImage.height || ogImageHeight
      ogImageAlt = pageImage.alt || pageSEO.title || ogImageAlt
    }
  }

  // Should we noindex this page?
  const robotsIndex = !indexingEnabled || pageSEO?.noIndex ? 'noindex' : 'index'

  return {
    title: pageSEO?.title ? `${pageSEO.title}${suffix}` : siteName,
    description: pageSEO?.description || siteDescription,
    keywords: pageSEO?.keywords,
    alternates: pageSEO?.alternates,
    openGraph: ogImageUrl
      ? {
          title: pageSEO?.title || siteName,
          description: pageSEO?.description || siteDescription,
          url: pageSEO?.alternates?.canonical,
          siteName,
          locale: 'en_US',
          type: 'website',
          images: [
            {
              url: ogImageUrl,
              width: ogImageWidth,
              height: ogImageHeight,
              alt: ogImageAlt,
            },
          ],
        }
      : undefined,
    twitter: {
      card: 'summary_large_image',
      title: pageSEO?.title || siteName,
      description: pageSEO?.description || siteDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: {
      index: robotsIndex === 'index',
      follow: true,
      googleBot: {
        index: robotsIndex === 'index',
        follow: true,
      },
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}
