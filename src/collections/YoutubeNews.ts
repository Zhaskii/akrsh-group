import { CollectionConfig } from 'payload'

export const YoutubeNews: CollectionConfig = {
  slug: 'youtube-news',
  admin: {
    useAsTitle: 'cornerType',
    defaultColumns: ['cornerType', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cornerType',
      type: 'select',
      required: true,
      label: 'Corner Type',
      options: [
        {
          label: 'Chairman Corner',
          value: 'chairman',
        },
        {
          label: 'CEO Corner',
          value: 'ceo',
        },
      ],
    },

    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      label: 'YouTube Video URL',
    },

    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
