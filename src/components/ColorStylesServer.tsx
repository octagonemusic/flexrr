import React from 'react'
import { ColorSettings } from '@/utils/getColorSettings'

export default function ColorStylesServer({
  colorSettings,
}: {
  colorSettings: ColorSettings | null
}) {
  if (!colorSettings) return null

  const cssVariables = `
    :root {
      ${colorSettings.background?.primary ? `--color-bg-primary: ${colorSettings.background.primary};` : ''}
      ${colorSettings.background?.secondary ? `--color-bg-secondary: ${colorSettings.background.secondary};` : ''}
      ${colorSettings.text?.primary ? `--color-text-primary: ${colorSettings.text.primary};` : ''}
      ${colorSettings.text?.secondary ? `--color-text-secondary: ${colorSettings.text.secondary};` : ''}
      ${colorSettings.accent?.primary ? `--color-accent-primary: ${colorSettings.accent.primary};` : ''}
      ${colorSettings.accent?.secondary ? `--color-accent-secondary: ${colorSettings.accent.secondary};` : ''}
      ${colorSettings.header?.background ? `--color-header-bg: ${colorSettings.header.background};` : ''}
      ${colorSettings.header?.text ? `--color-header-text: ${colorSettings.header.text};` : ''}
      ${colorSettings.footer?.background ? `--color-footer-bg: ${colorSettings.footer.background};` : ''}
      ${colorSettings.footer?.text ? `--color-footer-text: ${colorSettings.footer.text};` : ''}
      ${colorSettings.footer?.secondaryText ? `--color-footer-text-secondary: ${colorSettings.footer.secondaryText};` : ''}
    }
  `

  return <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
}
