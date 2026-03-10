// payload/collections/Gallery.ts
import { CollectionConfig } from 'payload'

export const ChairmanGallery: CollectionConfig = {
  slug: 'md-gallery',
  admin: {
    useAsTitle: 'title',
    group: 'MEDIA',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'chairman-categories',
      required: true,
      admin: {
        description: 'Select a category. ',
      },
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
