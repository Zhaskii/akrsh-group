import { CollectionConfig } from 'payload'

const Blog: CollectionConfig = {
  slug: 'blogs',

  admin: {
    useAsTitle: 'title',
    group: 'CONTENT',
  },

  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    // ✅ FIXED SLUG FIELD
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title) {
              data.slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
            }
          },
        ],
      },
    },

    {
      name: 'excerpt',
      type: 'richText',
      required: true,
      admin: {
        description: 'Short summary shown in listings and as fallback when no full content is set.',
      },
    },

    {
      name: 'content',
      type: 'richText',
      admin: {
        description:
          'Optional full article body. If empty, the excerpt is shown as the main content on the detail page.',
      },
    },

    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Arksh Help Status',
      defaultValue: 'closed',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        description: 'Whether this status shows in arksh helps.',
      },
    },

    {
      name: 'category',
      type: 'array',
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },

    // ——— SEO (dynamic per post) ———
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        description:
          'Optional. Leave empty to use title/excerpt as default. Used for dynamic meta tags and Open Graph.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Browser tab & search title. Defaults to blog title if empty.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Used in search results and social cards. Defaults to excerpt if empty.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG / Social Image',
          admin: {
            description:
              'Image for social sharing (Facebook, Twitter, etc.). Defaults to blog image if empty.',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Meta Keywords',
          admin: {
            description: 'Comma-separated keywords for SEO.',
          },
        },
        {
          name: 'canonicalURL',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            description:
              'Full URL of the canonical page (e.g. https://arkshgroup.com/blog/your-slug). Leave empty to use current URL.',
          },
        },
      ],
    },
  ],
}

export default Blog
