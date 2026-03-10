import type { CollectionConfig } from 'payload'

export const FeaturedProducts: CollectionConfig = {
  slug: 'featured-products',
  admin: {
    useAsTitle: 'id',
    group: 'MEDIA',
    defaultColumns: ['image', 'order', 'status'],
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
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Lower number appears first',
      },
    },
  ],
}
