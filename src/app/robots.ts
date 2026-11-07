import type { MetadataRoute } from 'next'

import { getSiteURL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const site = getSiteURL()

  return {
    host: site,
    rules: {
      allow: ['/', '/api/media/file/'],
      disallow: ['/admin/', '/api/', '/preview'],
      userAgent: '*',
    },
    sitemap: site + '/sitemap.xml',
  }
}
