import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,

    // ✅ allow logged-in users only
    create: ({ req }) => {
      return Boolean(req.user)
    },

    update: ({ req }) => {
      return Boolean(req.user)
    },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],

  upload: {
    staticDir: 'media',
  },

  admin: {
    useAsTitle: 'alt',
    group: 'MEDIA',
  },
}
