import type { CollectionConfig } from 'payload'
import { Cover } from '@/blocks/cover/schema'
import { RichText } from '@/blocks/richText/schema'
import { Image } from '@/blocks/image/schema'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [Cover, RichText, Image],
    },
  ],
}
