import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Enquiries } from './collections/Enquiries'
import { JournalPosts } from './collections/JournalPosts'
import { PortfolioCategories } from './collections/PortfolioCategories'
import { PortfolioProjects } from './collections/PortfolioProjects'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { Home } from './globals/Home'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    dateFormat: 'MMM d, yyyy',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['/components/payload/DashboardWelcome#DashboardWelcome'],
      graphics: {
        Icon: '/components/payload/AdminIcon#AdminIcon',
        Logo: '/components/payload/AdminLogo#AdminLogo',
      },
    },
    meta: {
      description: 'Manage website content, portfolio work, journal stories, and enquiries.',
      titleSuffix: '— Studio CMS',
    },
  },
  collections: [
    Users,
    Media,
    PortfolioCategories,
    PortfolioProjects,
    Services,
    Testimonials,
    JournalPosts,
    Enquiries,
  ],
  globals: [SiteSettings, Navigation, Home, About, Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
