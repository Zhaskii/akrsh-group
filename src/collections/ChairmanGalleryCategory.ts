import { CollectionConfig } from 'payload'

const ChairmanCategory: CollectionConfig = {
  slug: 'chairman-categories',
  admin: {
    useAsTitle: 'name',
    group: 'MEDIA',
    description: 'Categories for Gallery. Add categories here, then assign them to Gallery items.',
  },
  access: {
    read: () => true,
    update: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'editor'
    },
    create: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'editor'
    },
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'ChairmanCategory Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
  ],
}

export default ChairmanCategory
