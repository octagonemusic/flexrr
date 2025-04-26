import CoverBlockServer from '@/blocks/cover/Server'
import HeroBlockServer from '@/blocks/hero/Server'
import HeroCarouselServer from '@/blocks/heroCarousel/Server'
import ImageBlockServer from '@/blocks/image/Server'
import RichTextBlockServer from '@/blocks/richText/Server'
import CardGridServer from '@/blocks/cardGrid/Server'
import { Media, Page } from '@/payload-types'
import React, { Fragment } from 'react'
import { LexicalDocument } from '@/utils/serialize'

// Define interfaces for each block type
interface CoverBlock {
  blockType: 'cover'
  title: string
  subtitle: string
  id?: string | null
  blockName?: string | null
}

interface ImageBlock {
  blockType: 'image'
  image:
    | {
        url: string
        alt: string
      }
    | string // Can be a string ID or an object
  id?: string | null
  blockName?: string | null
}

interface RichTextBlock {
  blockType: 'richText'
  content: LexicalDocument
  id?: string | null
  blockName?: string | null
}

// Add to the existing BlockType union type
interface HeroBlock {
  blockType: 'hero'
  background: {
    type: 'image' | 'video'
    image?: Media | string
    video?: Media | string
    overlay?: boolean
  }
  layout: {
    contentAlignment: 'left' | 'center' | 'right'
    verticalAlignment: 'start' | 'center' | 'end'
    contentWidth: 'narrow' | 'medium' | 'wide'
  }
  content: {
    heading?: string
    subheading?: string
    buttons?: Array<{
      label?: string
      link?: string
      variant?: 'primary' | 'secondary'
    }>
  }
  id?: string | null
  blockName?: string | null
}

// Add this interface after your other block interfaces
interface HeroCarouselBlock {
  blockType: 'heroCarousel'
  slides: {
    background: {
      type: 'image' | 'video'
      image?: Media | string
      video?: Media | string
      overlay?: boolean
    }
    content: {
      heading?: string
      subheading?: string
      buttons?: Array<{
        label?: string
        link?: string
        variant?: 'primary' | 'secondary'
      }>
    }
  }[]
  settings: {
    autoplay: boolean
    interval: number
    showArrows: boolean
    showDots: boolean
    layout: {
      contentAlignment: 'left' | 'center' | 'right'
      contentWidth: 'narrow' | 'medium' | 'wide'
    }
  }
  id?: string | null
  blockName?: string | null
}

// Add this interface with your other block interfaces
interface CardGridBlock {
  blockType: 'cardGrid'
  heading?: string | null
  description?: string | null
  layout?: 'default' | 'compact' | 'wide'
  cards: Array<{
    image: Media | string
    title: string
    description?: string | null
    link?: {
      text?: string | null
      url?: string | null
    } | null
  }>
  id?: string | null
  blockName?: string | null
}

type BlockType =
  | CoverBlock
  | ImageBlock
  | RichTextBlock
  | HeroBlock
  | HeroCarouselBlock
  | CardGridBlock

// Type guards with specific types
function isCoverBlock(block: BlockType): block is CoverBlock {
  return block.blockType === 'cover'
}

function isImageBlock(block: BlockType): block is ImageBlock {
  return block.blockType === 'image'
}

function isRichTextBlock(block: BlockType): block is RichTextBlock {
  return block.blockType === 'richText'
}

// Add type guard
function isHeroBlock(block: BlockType): block is HeroBlock {
  return block.blockType === 'hero'
}

// Add this type guard with the other type guards
function isHeroCarouselBlock(block: BlockType): block is HeroCarouselBlock {
  return block.blockType === 'heroCarousel'
}

// Add this type guard with your other type guards
function isCardGridBlock(block: BlockType): block is CardGridBlock {
  return block.blockType === 'cardGrid'
}

// Helper function to get image object
function getImageObject(image: unknown): { url: string; alt: string } {
  if (typeof image === 'object' && image !== null && 'url' in image) {
    const img = image as { url: string; alt?: string }
    return {
      url: img.url,
      alt: img.alt || '',
    }
  }
  return { url: '', alt: '' }
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const typedBlock = block as BlockType

          // Add this case with the other block type checks
          if (isHeroCarouselBlock(typedBlock)) {
            return (
              <div key={index}>
                <HeroCarouselServer slides={typedBlock.slides} settings={typedBlock.settings} />
              </div>
            )
          }

          // Use type guards to render the correct component
          if (isCoverBlock(typedBlock)) {
            return (
              <div className="my-16" key={index}>
                <CoverBlockServer title={typedBlock.title} subtitle={typedBlock.subtitle} />
              </div>
            )
          }

          if (isImageBlock(typedBlock)) {
            return (
              <div className="my-16" key={index}>
                <ImageBlockServer image={getImageObject(typedBlock.image)} />
              </div>
            )
          }

          if (isRichTextBlock(typedBlock)) {
            return (
              <div className="my-16 px-4 sm:px-6" key={index}>
                <RichTextBlockServer content={typedBlock.content} />
              </div>
            )
          }

          // Add to the render logic inside the map function
          if (isHeroBlock(typedBlock)) {
            return (
              <div key={index}>
                <HeroBlockServer
                  background={typedBlock.background}
                  content={typedBlock.content}
                  layout={typedBlock.layout} // Pass the layout from the block data instead of hardcoding
                />
              </div>
            )
          }

          // Add to the render logic inside the map function
          if (isCardGridBlock(typedBlock)) {
            const processedCards = typedBlock.cards.filter(
              (card): card is typeof card & { image: Media } => {
                return typeof card.image !== 'string'
              },
            )
            return (
              <div key={index}>
                <CardGridServer
                  heading={typedBlock.heading}
                  description={typedBlock.description}
                  layout={typedBlock.layout}
                  cards={processedCards}
                />
              </div>
            )
          }

          // If none of the type guards match, this block has an unknown type
          console.warn(
            `Unknown block type: ${(block as { blockType?: string }).blockType || 'undefined'}`,
          )
          return null
        })}
      </Fragment>
    )
  }

  return null
}
