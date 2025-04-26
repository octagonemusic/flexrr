import { Block } from 'payload'

export const CardGrid: Block = {
  slug: 'cardGrid',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default (3 columns)', value: 'default' },
        { label: 'Compact (4 columns)', value: 'compact' },
        { label: 'Wide (2 columns)', value: 'wide' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Link Text',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
            },
          ],
        },
      ],
    },
  ],
}
