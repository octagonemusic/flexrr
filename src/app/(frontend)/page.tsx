import { Metadata } from 'next'
import { SlugPage } from './[slug]/page'
import { generateMetadata as generatePageMetadata } from '@/utils/generateMetadata'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'
import { getSiteSettings } from '@/utils/getSiteSettings'

// Set revalidation time for ISR on the homepage
export const revalidate = 60

// Cache for the page query (we need to define it here since we can't import it)
const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })
  return result.docs?.[0] || null
})

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'index' })
  const siteSettings = await getSiteSettings()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  if (!page) return {}

  // Get default site OG image if page doesn't have one
  let ogImage = page.seo?.image
  if (!ogImage && siteSettings?.generalSettings?.ogImage) {
    ogImage = siteSettings.generalSettings.ogImage
  }

  return generatePageMetadata({
    title: page.seo?.title || page.name || undefined,
    description: page.seo?.description || undefined,
    image: ogImage || undefined,
    noIndex: page.seo?.noIndex || false,
    alternates: {
      canonical: baseUrl,
    },
  })
}

// Create a wrapper component that passes the correct props
export default function HomePage() {
  // For the homepage, use 'index' as the slug
  return (
    <>
      <h1 className="sr-only">Home</h1>
      <SlugPage params={{ slug: 'index' }} />
    </>
  )
}
