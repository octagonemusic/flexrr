import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'SEO & Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'generalSettings',
      type: 'group',
      label: 'General Settings',
      fields: [
        {
          name: 'siteName',
          label: 'Site Name',
          type: 'text',
          required: true,
        },
        {
          name: 'siteDescription',
          label: 'Default Site Description',
          type: 'textarea',
        },
        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ogImage',
          label: 'Default Social Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Used for social media when sharing your site',
          },
        },
      ],
    },
    {
      name: 'seoSettings',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitleSuffix',
          label: 'Meta Title Suffix',
          type: 'text',
          admin: {
            description: 'Appended to all page titles, e.g. " | My Website"',
          },
        },
        {
          name: 'indexingEnabled',
          label: 'Enable Search Engine Indexing',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'accounts',
          type: 'array',
          label: 'Social Accounts',
          fields: [
            {
              name: 'platform',
              label: 'Platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'GitHub', value: 'github' },
              ],
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
