import React from 'react'
import './styles.css'
import HeaderServer from '@/blocks/globals/Header/Server'
import FooterServer from '@/blocks/globals/Footer/Server'
import { getSiteSettings } from '@/utils/getSiteSettings'
import { getColorSettings } from '@/utils/getColorSettings'
import { Media } from '@/payload-types'
import ColorStylesServer from '@/components/ColorStylesServer'
import CriticalCSS from '@/components/CriticalCSS'

// Set revalidation for the layout containing header and footer
export const revalidate = 60

// Font preloading to reduce layout shifts
const fontSans = '/fonts/Inter-Variable.woff2'

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()

  // Get favicon
  let faviconUrl = '/favicon.ico' // Default fallback
  if (
    siteSettings?.generalSettings?.favicon &&
    typeof siteSettings.generalSettings.favicon === 'object'
  ) {
    faviconUrl = (siteSettings.generalSettings.favicon as Media).url || faviconUrl
  }

  return {
    title: {
      default: siteSettings?.generalSettings?.siteName || 'Your Site',
      template: `%s${siteSettings?.seoSettings?.metaTitleSuffix || ''}`,
    },
    description: siteSettings?.generalSettings?.siteDescription,
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
    manifest: '/site.webmanifest',
  }
}

export function viewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  }
}

export function themeColor() {
  return {
    color: '#000000',
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const colorSettings = await getColorSettings()

  return (
    <html lang="en">
      <head>
        <ColorStylesServer colorSettings={colorSettings} />
        <link
          rel="preload"
          href={fontSans}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="google" content="notranslate" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CriticalCSS />
        <HeaderServer />
        <main>{children}</main>
        <FooterServer />
      </body>
    </html>
  )
}
