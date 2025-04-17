import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getSiteSettings = cache(async () => {
  const payload = await getPayload({ config })

  try {
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 2, // Load media relationships
    })

    return siteSettings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
})
