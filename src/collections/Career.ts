import { CollectionConfig } from 'payload'

const Career: CollectionConfig = {
  slug: 'careers',
  admin: {
    useAsTitle: 'title',
    group: 'CAREER',
  },
  access: {
    read: () => true,
    create: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'editor'
    },
    update: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'editor'
    },
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Job Title',
    },
    {
      name: 'location',
      type: 'text',
      required: false,
      label: 'Location',
      admin: {
        description: 'e.g., Lalitpur, Dhapakhel, Nepal',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: false,
      label: 'Employment Type',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
      ],
    },
    {
      name: 'vacancyCount',
      type: 'number',
      required: false,
      label: 'Number of Vacancies',
      min: 1,
      admin: {
        description: 'Number of open seats for this position (e.g., 2)',
        placeholder: '1',
      },
      defaultValue: 1,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Status',
      defaultValue: 'closed',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        description: 'Whether this position is currently accepting applications',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Job Description',
      admin: {
        description: 'Detailed description of the role and responsibilities',
      },
    },
    {
      name: 'requirements',
      type: 'textarea',
      required: false,
      label: 'Requirements',
      admin: {
        description: 'Required qualifications, skills, and experience',
      },
    },
    {
      name: 'responsibilities',
      type: 'textarea',
      required: false,
      label: 'Key Responsibilities',
      admin: {
        description: 'Main duties and responsibilities for this position',
      },
    },
    {
      name: 'deadline',
      type: 'date',
      required: false,
      label: 'Application Deadline',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      label: 'Display Order',
      admin: {
        description: 'Order in which positions appear (lower numbers first)',
      },
      defaultValue: 0,
    },
  ],
}

export default Career
