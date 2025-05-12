'use client'

import Script from 'next/script'
import { useMemo } from 'react'

interface Organization {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
}

interface WebSite {
  name: string
  url: string
}

interface Breadcrumb {
  '@type': 'BreadcrumbList'
  itemListElement: {
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }[]
}

interface WebPage {
  name: string
  description?: string
  image?: string
  url: string
  breadcrumb?: Breadcrumb
}

interface SchemaOrgProps {
  organization: Organization
  webSite: WebSite
  webPage: WebPage
}

export default function SchemaOrgBuilder({ organization, webSite, webPage }: SchemaOrgProps) {
  const schemaOrgData = useMemo(() => {
    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organization.name,
        url: organization.url,
        ...(organization.logo && { logo: organization.logo }),
        ...(organization.sameAs && { sameAs: organization.sameAs }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: webSite.name,
        url: webSite.url,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: webPage.name,
        ...(webPage.description && { description: webPage.description }),
        ...(webPage.image && { image: webPage.image }),
        url: webPage.url,
        ...(webPage.breadcrumb && { breadcrumb: webPage.breadcrumb }),
      },
    ]

    return JSON.stringify(data)
  }, [organization, webSite, webPage])

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaOrgData }}
      strategy="afterInteractive"
    />
  )
}
