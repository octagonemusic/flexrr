import { Block } from 'payload'

export const Image: Block = {
  slug: 'image',
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'width',
          label: 'Width',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Large', value: 'large' },
            { label: 'Medium', value: 'medium' },
            { label: 'Small', value: 'small' },
          ],
        },
        {
          name: 'alignment',
          label: 'Alignment',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        {
          name: 'rounded',
          label: 'Rounded Corners',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'shadow',
          label: 'Add Shadow',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
