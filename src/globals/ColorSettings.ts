import type { GlobalConfig } from 'payload'

export const ColorSettings: GlobalConfig = {
  slug: 'color-settings',
  label: 'Color Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'background',
      type: 'group',
      label: 'Background Colors',
      fields: [
        {
          name: 'primary',
          label: 'Primary Background',
          type: 'text',
          defaultValue: '#000000',
          admin: {
            description: 'The main background color of the site (example: #000000)',
          },
        },
        {
          name: 'secondary',
          label: 'Secondary Background',
          type: 'text',
          defaultValue: '#121212',
          admin: {
            description: 'Used for cards, sections, and secondary elements (example: #121212)',
          },
        },
      ],
    },
    {
      name: 'text',
      type: 'group',
      label: 'Text Colors',
      fields: [
        {
          name: 'primary',
          label: 'Primary Text',
          type: 'text',
          defaultValue: '#FFFFFF',
          admin: {
            description: 'Main text color throughout the site (example: #FFFFFF)',
          },
        },
        {
          name: 'secondary',
          label: 'Secondary Text',
          type: 'text',
          defaultValue: '#AAAAAA',
          admin: {
            description: 'Used for less important text, subtitles, and captions (example: #AAAAAA)',
          },
        },
      ],
    },
    {
      name: 'accent',
      type: 'group',
      label: 'Accent Colors',
      fields: [
        {
          name: 'primary',
          label: 'Primary Accent',
          type: 'text',
          defaultValue: '#3B82F6',
          admin: {
            description: 'Main accent color for buttons, links, and highlights (example: #3B82F6)',
          },
        },
        {
          name: 'secondary',
          label: 'Secondary Accent',
          type: 'text',
          defaultValue: '#8B5CF6',
          admin: {
            description:
              'Used for secondary buttons, hover states, and alternative highlights (example: #8B5CF6)',
          },
        },
      ],
    },
    {
      name: 'header',
      type: 'group',
      label: 'Header Colors',
      fields: [
        {
          name: 'background',
          label: 'Header Background',
          type: 'text',
          defaultValue: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
          admin: {
            description:
              'Background color or gradient for the site header (example: linear-gradient(to right, #3B82F6, #8B5CF6) or #3B82F6)',
          },
        },
        {
          name: 'text',
          label: 'Header Text',
          type: 'text',
          defaultValue: '#FFFFFF',
          admin: {
            description: 'Text color for the header navigation (example: #FFFFFF)',
          },
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Colors',
      fields: [
        {
          name: 'background',
          label: 'Footer Background',
          type: 'text',
          defaultValue: '#1F2937',
          admin: {
            description: 'Background color for the site footer (example: #1F2937)',
          },
        },
        {
          name: 'text',
          label: 'Footer Text',
          type: 'text',
          defaultValue: '#FFFFFF',
          admin: {
            description: 'Main text color in the footer (example: #FFFFFF)',
          },
        },
        {
          name: 'secondaryText',
          label: 'Footer Secondary Text',
          type: 'text',
          defaultValue: '#9CA3AF',
          admin: {
            description: 'Used for less important text in the footer (example: #9CA3AF)',
          },
        },
      ],
    },
  ],
}
