import React from 'react'
import './styles.css'
import HeaderServer from '@/blocks/globals/Header/Server'
import FooterServer from '@/blocks/globals/Footer/Server'

// Set revalidation for the layout containing header and footer
export const revalidate = 60

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <HeaderServer />
        <main>{children}</main>
        <FooterServer />
      </body>
    </html>
  )
}
