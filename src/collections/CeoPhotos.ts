import { CollectionConfig } from 'payload'

export const CeoPhotos: CollectionConfig = {
  slug: 'ceo-photos',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Higher numbers appear first in the slider',
      },
    },
  ],
}
