import { Metadata } from 'next'
import { getSiteSettings } from './getSiteSettings'
import { Media } from '@/payload-types'

interface PageSEO {
  title?: string
  description?: string
  image?: string | Media
  noIndex?: boolean
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
  if (
    siteSettings?.generalSettings?.ogImage &&
    typeof siteSettings.generalSettings.ogImage === 'object'
  ) {
    ogImageUrl = (siteSettings.generalSettings.ogImage as Media).url || ''
  }

  // Page-specific OG image if available
  if (pageSEO?.image) {
    if (typeof pageSEO.image === 'object' && 'url' in pageSEO.image) {
      ogImageUrl = (pageSEO.image as Media).url || ogImageUrl
    }
  }

  // Should we noindex this page?
  const robotsIndex = !indexingEnabled || pageSEO?.noIndex ? 'noindex' : 'index'

  return {
    title: pageSEO?.title ? `${pageSEO.title}${suffix}` : siteName,
    description: pageSEO?.description || siteDescription,
    openGraph: ogImageUrl
      ? {
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: pageSEO?.title || siteName,
            },
          ],
        }
      : undefined,
    robots: {
      index: robotsIndex === 'index',
      follow: true,
      googleBot: {
        index: robotsIndex === 'index',
        follow: true,
      },
    },
  }
}
