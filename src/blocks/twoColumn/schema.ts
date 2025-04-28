import { Block } from 'payload'

export const TwoColumn: Block = {
  slug: 'twoColumn',
  fields: [
    {
      name: 'layout',
      type: 'group',
      fields: [
        {
          name: 'contentRatio',
          type: 'select',
          defaultValue: '50-50',
          options: [
            { label: 'Equal (50/50)', value: '50-50' },
            { label: 'Left Heavy (60/40)', value: '60-40' },
            { label: 'Right Heavy (40/60)', value: '40-60' },
            { label: 'Left Dominant (70/30)', value: '70-30' },
            { label: 'Right Dominant (30/70)', value: '30-70' },
          ],
        },
        {
          name: 'verticalAlignment',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Top', value: 'start' },
            { label: 'Center', value: 'center' },
            { label: 'Bottom', value: 'end' },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Medium', value: 'medium' },
            { label: 'Spacious', value: 'spacious' },
          ],
        },
        {
          name: 'reverseOnMobile',
          type: 'checkbox',
          label: 'Reverse columns on mobile',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'leftColumn',
      type: 'group',
      fields: [
        {
          name: 'contentType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text Content', value: 'text' },
            { label: 'Media', value: 'media' },
          ],
        },
        {
          name: 'text',
          type: 'group',
          admin: {
            condition: (data, sibling) => sibling?.contentType === 'text',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
          ],
        },
        {
          name: 'media',
          type: 'group',
          admin: {
            condition: (data, sibling) => sibling?.contentType === 'media',
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
              defaultValue: 'image',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, sibling) => sibling?.type === 'image',
              },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, sibling) => sibling?.type === 'video',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'rightColumn',
      type: 'group',
      fields: [
        {
          name: 'contentType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text Content', value: 'text' },
            { label: 'Media', value: 'media' },
          ],
        },
        {
          name: 'text',
          type: 'group',
          admin: {
            condition: (data, sibling) => sibling?.contentType === 'text',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
          ],
        },
        {
          name: 'media',
          type: 'group',
          admin: {
            condition: (data, sibling) => sibling?.contentType === 'media',
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
              defaultValue: 'image',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, sibling) => sibling?.type === 'image',
              },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, sibling) => sibling?.type === 'video',
              },
            },
          ],
        },
      ],
    },
  ],
}
