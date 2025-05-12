import config from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Media, Page as PageType } from '../../../payload-types'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { notFound } from 'next/navigation'
import { generateMetadata as generatePageMetadata } from '@/utils/generateMetadata'
import { Metadata } from 'next'
import { getSiteSettings } from '@/utils/getSiteSettings'
import SchemaOrgBuilder from '@/components/SchemaOrg/SchemaOrgBuilder'
import { ensureStringOrUndefined, filterToStringArray, stringWithFallback } from '@/utils/typeGuards'

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
  const prms = await params
  const pageSlug = prms.slug || 'index'
  const page = await queryPageBySlug({ slug: pageSlug })

  if (!page) return {}

  // Get site settings for additional metadata
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const canonicalUrl = `${baseUrl}/${pageSlug === 'index' ? '' : pageSlug}`

  // Use the custom SEO settings if available, or fall back to page name
  return generatePageMetadata({
    title: page.seo?.title || page.name || undefined,
    description: page.seo?.description || undefined,
    image: page.seo?.image || undefined,
    noIndex: page.seo?.noIndex === true,
    alternates: {
      canonical: canonicalUrl,
    },
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

  // Get site settings for schema.org data
  const siteSettings = await getSiteSettings()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const pageUrl = `${baseUrl}/${pageSlug === 'index' ? '' : pageSlug}`
  
  // Prepare schema.org data with proper type handling
  // Extract organization data with null safety using our utility functions
  const siteName = stringWithFallback(siteSettings?.generalSettings?.siteName, 'Flexrr')
  
  // Get organization logo URL if it exists
  let logoUrl: string | undefined = undefined
  if (siteSettings?.generalSettings?.favicon && 
      typeof siteSettings.generalSettings.favicon === 'object') {
    const favicon = siteSettings.generalSettings.favicon as Media
    logoUrl = ensureStringOrUndefined(favicon.url)
  }
  
  // Get page image URL if it exists
  let imageUrl: string | undefined = undefined
  if (page.seo?.image && typeof page.seo.image === 'object') {
    const mediaObj = page.seo.image as Media
    imageUrl = ensureStringOrUndefined(mediaObj.url)
  }

  // Extract social media links with proper typing
  let socialLinks: string[] = []
  if (siteSettings?.socialMedia?.accounts && Array.isArray(siteSettings.socialMedia.accounts)) {
    // Use map and then filter to ensure we only have string values
    socialLinks = filterToStringArray(
      siteSettings.socialMedia.accounts.map(account => account?.url)
    )
  }

  // Extract page metadata with proper fallbacks
  const pageName = page.seo?.title || page.name || "Page"
  
  const pageDescription = ensureStringOrUndefined(page.seo?.description)

  return (
    <article>
      <SchemaOrgBuilder 
        organization={{
          name: siteName,
          url: baseUrl,
          logo: logoUrl,
          sameAs: socialLinks.length > 0 ? socialLinks : undefined
        }}
        webSite={{
          name: siteName,
          url: baseUrl
        }}
        webPage={{
          name: pageName,
          description: pageDescription,
          image: imageUrl,
          url: pageUrl
        }}
      />
      <h1 className="sr-only">{page.name}</h1>
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

export { Page as SlugPage }
