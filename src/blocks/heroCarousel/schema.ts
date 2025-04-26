import { Block } from 'payload'

export const HeroCarousel: Block = {
  slug: 'heroCarousel',
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'background',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                {
                  label: 'Image',
                  value: 'image',
                },
                {
                  label: 'Video',
                  value: 'video',
                },
              ],
              defaultValue: 'image',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'image',
              },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'video',
              },
            },
            {
              name: 'overlay',
              type: 'checkbox',
              label: 'Add dark overlay',
              defaultValue: true,
            },
          ],
        },
        {
          name: 'content',
          type: 'group',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'textarea',
            },
            {
              name: 'buttons',
              type: 'array',
              maxRows: 2,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    {
                      label: 'Primary',
                      value: 'primary',
                    },
                    {
                      label: 'Secondary',
                      value: 'secondary',
                    },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          label: 'Enable autoplay',
          defaultValue: true,
        },
        {
          name: 'interval',
          type: 'number',
          label: 'Slide interval (seconds)',
          defaultValue: 5,
          admin: {
            condition: (data, siblingData) => siblingData?.autoplay,
          },
        },
        {
          name: 'showArrows',
          type: 'checkbox',
          label: 'Show navigation arrows',
          defaultValue: true,
        },
        {
          name: 'showDots',
          type: 'checkbox',
          label: 'Show navigation dots',
          defaultValue: true,
        },
        {
          name: 'layout',
          type: 'group',
          fields: [
            {
              name: 'contentAlignment',
              type: 'select',
              defaultValue: 'center',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              name: 'contentWidth',
              type: 'select',
              defaultValue: 'medium',
              options: [
                { label: 'Narrow', value: 'narrow' },
                { label: 'Medium', value: 'medium' },
                { label: 'Wide', value: 'wide' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
