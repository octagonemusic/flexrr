import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Footer Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Logo displayed in the footer (recommended dimensions: 160x64px)',
      },
    },
    {
      name: 'columns',
      label: 'Footer Columns',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Configure up to 3 columns of navigation links',
      },
      fields: [
        {
          name: 'title',
          label: 'Column Title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Navigation Links',
          type: 'array',
          minRows: 1,
          maxRows: 6,
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
              name: 'newTab',
              label: 'Open in New Tab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'contactInfo',
      label: 'Contact Information',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          defaultValue: 'Contact Us',
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'text',
          admin: {
            description: 'Primary contact email',
          },
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
        },
        {
          name: 'address',
          label: 'Business Address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'socialMedia',
      label: 'Social Media',
      type: 'array',
      admin: {
        description: 'Add social media links to the footer',
      },
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'GitHub', value: 'github' },
            { label: 'Discord', value: 'discord' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        {
          name: 'url',
          label: 'Profile URL',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          label: 'Brand Color (optional)',
          type: 'text',
          admin: {
            description: 'Hex color code for the icon (e.g. #1DA1F2 for Twitter blue)',
          },
        },
      ],
    },
    {
      name: 'copyrightSettings',
      label: 'Copyright Settings',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          label: 'Copyright Text',
          type: 'text',
          admin: {
            description: 'Use {year} to insert the current year',
          },
          defaultValue: '© {year} All rights reserved.',
        },
        {
          name: 'companyName',
          label: 'Company Name',
          type: 'text',
        },
        {
          name: 'showCurrentYear',
          label: 'Auto-update Year',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'layout',
      label: 'Footer Layout',
      type: 'group',
      fields: [
        {
          name: 'style',
          label: 'Footer Style',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Minimal', value: 'minimal' },
            { label: 'Expanded', value: 'expanded' },
          ],
        },
        {
          name: 'columnsOnMobile',
          label: 'Mobile Layout',
          type: 'select',
          defaultValue: 'stack',
          options: [
            { label: 'Stack All', value: 'stack' },
            { label: 'Two Columns', value: '2-cols' },
          ],
        },
        {
          name: 'width',
          label: 'Container Width',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Standard (1200px)', value: 'standard' },
            { label: 'Wide (1400px)', value: 'wide' },
            { label: 'Narrow (1000px)', value: 'narrow' },
          ],
        },
      ],
    },
  ],
}