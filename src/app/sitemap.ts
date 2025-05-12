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
    sort: '-updatedAt', // Sort by most recently updated first
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
      
      // Determine priority based on page slug pattern
      let priority = 0.7; // default priority
      
      if (page.slug === 'index') {
        priority = 1.0; // Homepage priority
      } else if (page.slug.split('/').length === 1) {
        priority = 0.9; // Top-level pages
      } else if (page.slug.split('/').length === 2) {
        priority = 0.8; // Second-level pages
      } else if (page.slug.includes('blog') || page.slug.includes('news')) {
        priority = 0.6; // Blog posts
      }

      // Determine change frequency based on update patterns
      // More frequently updated pages get higher frequency
      const daysSinceUpdate = Math.floor((Date.now() - new Date(page.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly';
      
      if (page.slug === 'index') {
        changeFrequency = 'daily';
      } else if (daysSinceUpdate < 7) {
        changeFrequency = 'weekly';
      } else if (daysSinceUpdate < 30) {
        changeFrequency = 'monthly';
      } else if (daysSinceUpdate < 365) {
        changeFrequency = 'yearly';
      }

      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: changeFrequency,
        priority: priority,
      }
    })

  return sitemapEntries
}
