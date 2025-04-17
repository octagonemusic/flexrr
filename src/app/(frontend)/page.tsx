import { Metadata } from 'next'
import { SlugPage } from './[slug]/page'
import { generateMetadata as generatePageMetadata } from '@/utils/generateMetadata'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

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

  if (!page) return {}

  return generatePageMetadata({
    title: page.seo?.title || page.name || undefined,
    description: page.seo?.description || undefined,
    image: page.seo?.image || undefined,
    noIndex: page.seo?.noIndex || false,
  })
}

// Create a wrapper component that passes the correct props
export default function HomePage() {
  // For the homepage, use 'index' as the slug
  return <SlugPage params={{ slug: 'index' }} />
}
