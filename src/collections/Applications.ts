import { CollectionConfig } from 'payload'

const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'name',
    group: 'CAREER',
  },
  access: {
    read: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'viewer' || req.user?.role === 'editor'
      )
    },
    create: () => true, // Allow public submissions
    update: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'editor'
      )
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
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Phone Number',
    },
    {
      name: 'location',
      type: 'text',
      required: false,
      label: 'Location',
    },
    {
      name: 'position',
      type: 'text',
      required: false,
      label: 'Position Applied For',
      admin: {
        description: 'The job title or position they are applying for',
      },
    },
    {
      name: 'expectedSalary',
      type: 'number',
      required: false,
      label: 'Expected Salary',
    },
    {
      name: 'startDate',
      type: 'date',
      required: false,
      label: 'Available Start Date',
    },
    {
      name: 'experience',
      type: 'text',
      required: false,
      label: 'Years of Experience',
    },
    {
      name: 'employmentStatus',
      type: 'select',
      required: false,
      label: 'Employment Status',
      options: [
        'Employed',
        'Unemployed',
        'Self-employed',
        'Student',
      ],
    },
    {
      name: 'hasReferrer',
      type: 'checkbox',
      required: false,
      label: 'Has Referrer',
    },
    {
      name: 'referrerName',
      type: 'text',
      required: false,
      label: 'Referrer Name',
    },
    {
      name: 'referrerEmail',
      type: 'email',
      required: false,
      label: 'Referrer Email',
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'CV/Resume',
      admin: {
        description: 'Uploaded CV or resume file',
      },
    },
  ],
}

export default Applications
