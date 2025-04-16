import config from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Page as PageType } from '../../../payload-types'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { notFound } from 'next/navigation'

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
  // Get the slug from params (no need to await it)
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
