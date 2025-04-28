import { Block } from 'payload'

export const PricingTable: Block = {
  slug: 'pricingTable',
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
      type: 'group',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Compact', value: 'compact' },
            { label: 'Featured Center', value: 'featured' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
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
      ],
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Plan',
          defaultValue: false,
        },
        {
          name: 'price',
          type: 'group',
          fields: [
            {
              name: 'amount',
              type: 'number',
              required: true,
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'USD',
              options: [
                { label: 'USD ($)', value: 'USD' },
                { label: 'EUR (€)', value: 'EUR' },
                { label: 'GBP (£)', value: 'GBP' },
              ],
            },
            {
              name: 'period',
              type: 'select',
              defaultValue: 'monthly',
              options: [
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
                { label: 'One-time', value: 'once' },
              ],
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          name: 'button',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Get Started',
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
  ],
}
