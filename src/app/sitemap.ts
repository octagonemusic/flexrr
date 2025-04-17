import { getPayload } from 'payload'
import config from '@payload-config'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Get all pages
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
  })

  // Get site settings to check if indexing is enabled
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Bail if indexing is disabled globally
  if (siteSettings?.seoSettings?.indexingEnabled === false) {
    return []
  }

  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  // Create sitemap entries
  const sitemapEntries = pages.docs
    // Filter out pages marked as noIndex
    .filter((page) => !page.seo?.noIndex)
    .map((page) => {
      const slug = page.slug === 'index' ? '' : page.slug

      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: page.slug === 'index' ? 1.0 : 0.8,
      }
    })

  return sitemapEntries
}
