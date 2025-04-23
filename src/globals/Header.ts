import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'nav',
      label: 'Navigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          admin: {
            condition: (data, siblingData) => {
              return !siblingData.submenu || !siblingData.submenu.length
            },
          },
        },
        {
          name: 'badge',
          label: 'Badge Text',
          type: 'text',
          admin: {
            description: 'Optional badge (e.g. "New", "Hot")',
          },
        },
        {
          name: 'submenu',
          label: 'Dropdown Menu',
          type: 'array',
          admin: {
            description: 'Add dropdown items (if any)',
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
            },
          ],
        },
      ],
      minRows: 1,
      maxRows: 8,
      required: true,
    },
    {
      name: 'actionButton',
      type: 'group',
      label: 'Action Button',
      admin: {
        description: 'Optional call-to-action button',
      },
      fields: [
        {
          name: 'label',
          label: 'Button Text',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Button Link',
          type: 'text',
        },
      ],
    },
  ],
}
