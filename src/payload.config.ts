// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Contact from './collections/Contact'
import Blog from './collections/Blog'
import Category from './collections/Category'
import Career from './collections/Career'
import Applications from './collections/Applications'
import { Gallery } from './collections/Gallery'
import News from './collections/News'
import { YoutubeNews } from './collections/YoutubeNews'
import { ChairmanGallery } from './collections/ChairmanGallery'
import ChairmanCategory from './collections/ChairmanGalleryCategory'
import { FeaturedProducts } from './collections/FeaturedProducts'
import { Companies } from './collections/Companies'
import { Brands } from './collections/Brands'
import { SocialVideos } from './collections/SocialVideos'
import MDPhotos from './collections/MdPhotos'
import { CeoPhotos } from './collections/CeoPhotos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Arksh Group',
      description: 'Arksh Group',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/logo.jpg',
        },
      ],
    },

    components: {
      Nav: '../src/components/Nav.tsx',
      graphics: {
        Logo: '../src/components/LoginLogo.tsx',
      },
      header: ['../src/components/AdminHeader.tsx'],
    },
  },
  cors: ['https://arkshgroup.com', 'https://www.arkshgroup.com'],
  collections: [
    Contact,
    Category,
    Media,
    Blog,
    Career,
    Applications,
    Users,
    Gallery,
    News,
    YoutubeNews,
    ChairmanGallery,
    ChairmanCategory,
    FeaturedProducts,
    Companies,
    Brands,
    SocialVideos,
    MDPhotos,
    CeoPhotos,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
