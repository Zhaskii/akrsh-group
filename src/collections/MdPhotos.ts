import { CollectionConfig } from 'payload'

const MDPhotos: CollectionConfig = {
  slug: 'md-photos',
  admin: {
    useAsTitle: 'caption',
    group: 'MD Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gallery Image',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
  ],
}

export default MDPhotos
