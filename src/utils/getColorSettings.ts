import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

// Define a proper type for the color settings
export interface ColorSettings {
  background?: {
    primary?: string
    secondary?: string
  }
  text?: {
    primary?: string
    secondary?: string
  }
  accent?: {
    primary?: string
    secondary?: string
  }
  header?: {
    background?: string
    text?: string
  }
  footer?: {
    background?: string
    text?: string
    secondaryText?: string
  }
}

export const getColorSettings = cache(async (): Promise<ColorSettings | null> => {
  const payload = await getPayload({ config })

  try {
    const colorSettings = await payload.findGlobal({
      slug: 'color-settings',
    })

    // Transform the result to match our expected ColorSettings type
    const result: ColorSettings = {
      background: {
        primary: colorSettings?.background?.primary || undefined,
        secondary: colorSettings?.background?.secondary || undefined,
      },
      text: {
        primary: colorSettings?.text?.primary || undefined,
        secondary: colorSettings?.text?.secondary || undefined,
      },
      accent: {
        primary: colorSettings?.accent?.primary || undefined,
        secondary: colorSettings?.accent?.secondary || undefined,
      },
      header: {
        background: colorSettings?.header?.background || undefined,
        text: colorSettings?.header?.text || undefined,
      },
      footer: {
        background: colorSettings?.footer?.background || undefined,
        text: colorSettings?.footer?.text || undefined,
        secondaryText: colorSettings?.footer?.secondaryText || undefined,
      },
    }

    return result
  } catch (error) {
    console.error('Error fetching color settings:', error)
    return null
  }
})
