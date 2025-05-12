import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Header Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Logo displayed in the header (recommended dimensions: 160x64px)',
      },
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
          required: true,
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
          name: 'badgeColor',
          label: 'Badge Color',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Success', value: 'success' },
            { label: 'Danger', value: 'danger' },
            { label: 'Warning', value: 'warning' },
            { label: 'Info', value: 'info' },
          ],
          defaultValue: 'secondary',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.badge),
            description: 'Color theme for the badge',
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
              required: true,
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              admin: {
                description: 'Optional short description under the label',
              },
            },
            {
              name: 'icon',
              label: 'Icon Name',
              type: 'text',
              admin: {
                description: 'Optional icon name (e.g., "home", "settings")',
              },
            },
            {
              name: 'highlight',
              label: 'Highlight Item',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
      minRows: 1,
      maxRows: 8,
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Action Buttons',
      admin: {
        description: 'Add up to 2 call-to-action buttons',
      },
      maxRows: 2,
      fields: [
        {
          name: 'label',
          label: 'Button Text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Button Link',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          label: 'Style Variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Text Only', value: 'text' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
        {
          name: 'icon',
          label: 'Icon Name',
          type: 'text',
          admin: {
            description: 'Optional icon name to show before text (e.g., "arrow-right")',
          },
        },
        {
          name: 'newTab',
          label: 'Open in New Tab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'layout',
      type: 'group',
      label: 'Layout Options',
      fields: [
        {
          name: 'variant',
          label: 'Header Style',
          type: 'select',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Transparent', value: 'transparent' },
            { label: 'Centered', value: 'centered' },
            { label: 'Minimal', value: 'minimal' },
          ],
          defaultValue: 'standard',
        },
        {
          name: 'sticky',
          label: 'Sticky Header',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'containerWidth',
          label: 'Container Width',
          type: 'select',
          options: [
            { label: 'Standard (1200px)', value: 'standard' },
            { label: 'Wide (1400px)', value: 'wide' },
            { label: 'Narrow (1000px)', value: 'narrow' },
            { label: 'Full Width', value: 'full' },
          ],
          defaultValue: 'standard',
        },
        {
          name: 'mobileBreakpoint',
          label: 'Mobile Menu Breakpoint',
          type: 'select',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
          ],
          defaultValue: 'md',
        },
      ],
    },
    {
      name: 'topBar',
      type: 'group',
      label: 'Top Announcement Bar',
      admin: {
        description: 'Optional bar above the main header for announcements or contact info',
      },
      fields: [
        {
          name: 'enabled',
          label: 'Enable Top Bar',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'text',
          label: 'Bar Text',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'ctaText',
          label: 'Call to Action Text',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'ctaLink',
          label: 'Call to Action Link',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled && Boolean(siblingData?.ctaText),
          },
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Hex color code (e.g., #FF5500) or use "primary", "secondary"',
          },
          defaultValue: 'primary',
        },
      ],
    },
  ],
}