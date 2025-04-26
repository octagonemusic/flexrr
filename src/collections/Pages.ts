import type { CollectionConfig } from 'payload'
import { Cover } from '@/blocks/cover/schema'
import { RichText } from '@/blocks/richText/schema'
import { Image } from '@/blocks/image/schema'
import { Hero } from '@/blocks/hero/schema'

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
      blocks: [Cover, RichText, Image, Hero],
    },
    {
      name: 'seo',
      label: 'SEO Settings',
      type: 'group',
      admin: {
        description: 'Settings for search engine optimization',
      },
      fields: [
        {
          name: 'title',
          label: 'Meta Title',
          type: 'text',
          admin: {
            description: 'Custom title for search engines. Defaults to page name if empty.',
          },
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Brief description for search engines.',
          },
        },
        {
          name: 'image',
          label: 'Social Sharing Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Image displayed when shared on social media (defaults to global setting if empty).',
          },
        },
        {
          name: 'noIndex',
          label: 'Hide from Search Engines',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
