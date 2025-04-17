import { getPayload } from 'payload'
import config from '@payload-config'
import { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const payload = await getPayload({ config })

  // Get site settings to check if indexing is enabled
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const indexingEnabled = siteSettings?.seoSettings?.indexingEnabled !== false
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    rules: {
      userAgent: '*',
      allow: indexingEnabled ? '/' : '',
      disallow: indexingEnabled ? '' : '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
