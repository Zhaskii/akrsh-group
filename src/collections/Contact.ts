import { CollectionConfig } from 'payload'

const Contact: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'fullName',
    group: 'BOOKINGS',
  },
  access: {
    read: () => true,
    create: () => true,

    update: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'editor'
    },

    // create: ({ req }) => {
    //   return (
    //     req.user?.role === 'admin' || req.user?.role === 'viewer' || req.user?.role === 'editor'
    //   )
    // },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'subject',
      type: 'select',
      options: [
        {
          label: 'General Inquiry',
          value: 'General Inquiry',
        },
        {
          label: 'Customer Support',
          value: 'Customer Support',
        },
        {
          label: 'Sales Inquiry',
          value: 'Sales Inquiry',
        },
      ],
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
  ],
}

export default Contact
