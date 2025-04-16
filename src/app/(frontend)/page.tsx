import { Metadata } from 'next'
import { SlugPage } from './[slug]/page'

// Set revalidation time for ISR on the homepage
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our site',
}

// Create a wrapper component that passes the correct props
export default function HomePage() {
  // For the homepage, use 'index' as the slug
  return <SlugPage params={{ slug: 'index' }} />
}
