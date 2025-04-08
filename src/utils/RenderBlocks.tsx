import CoverBlockServer from '@/blocks/cover/Server'
import ImageBlockServer from '@/blocks/image/Server'
import RichTextBlockServer from '@/blocks/richText/Server'
import { Page } from '@/payload-types'
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

// Union type for all possible block types
type BlockType = CoverBlock | ImageBlock | RichTextBlock

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
          // Cast the block to our union type since we know it matches one of our types
          const typedBlock = block as BlockType

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
