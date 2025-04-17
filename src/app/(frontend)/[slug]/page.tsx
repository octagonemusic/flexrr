import config from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Page as PageType } from '../../../payload-types'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { notFound } from 'next/navigation'
import { generateMetadata as generatePageMetadata } from '@/utils/generateMetadata'
import { Metadata } from 'next'

// Cache for the page query
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

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const pageSlug = params.slug || 'index'
  const page = await queryPageBySlug({ slug: pageSlug })

  if (!page) return {}

  // Use the custom SEO settings if available, or fall back to page name
  return generatePageMetadata({
    title: page.seo?.title || page.name || undefined,
    description: page.seo?.description || undefined,
    image: page.seo?.image || undefined,
    noIndex: page.seo?.noIndex === true,
  })
}

// Generate static pages at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
  })

  return pages.docs?.map(({ slug }) => ({ slug })) || []
}

// Set revalidation time for ISR (e.g., 60 seconds)
export const revalidate = 60

// Define a proper interface for the page props
interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  // Get the slug from params
  const { slug } = await params
  const pageSlug = slug || 'index'

  const page: PageType | null = await queryPageBySlug({
    slug: pageSlug,
  })

  if (!page) {
    return notFound()
  }

  return (
    <article className="pt-16 pb-24">
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

export { Page as SlugPage }
