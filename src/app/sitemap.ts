import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { getSiteURL } from '@/lib/seo'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteURL()

  const baseStaticEntries: MetadataRoute.Sitemap = [
    {
      changeFrequency: 'weekly',
      priority: 1,
      url: site,
    },
    {
      changeFrequency: 'weekly',
      priority: 0.9,
      url: site + '/portfolio',
    },
    {
      changeFrequency: 'monthly',
      priority: 0.85,
      url: site + '/services',
    },
    {
      changeFrequency: 'monthly',
      priority: 0.8,
      url: site + '/about',
    },
    {
      changeFrequency: 'weekly',
      priority: 0.85,
      url: site + '/journal',
    },
    {
      changeFrequency: 'monthly',
      priority: 0.7,
      url: site + '/contact',
    },
  ]

  try {
    const payload = await getPayload({ config })

    const [projects, posts, siteSettings, about, contact] = await Promise.all([
      payload.find({
        collection: 'portfolio-projects',
        depth: 0,
        limit: 1000,
        overrideAccess: false,
        sort: '-updatedAt',
      }),
      payload.find({
        collection: 'journal-posts',
        depth: 0,
        limit: 1000,
        overrideAccess: false,
        sort: '-publishedAt',
      }),
      payload.findGlobal({
        slug: 'site-settings',
        depth: 0,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: 'about',
        depth: 0,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: 'contact',
        depth: 0,
        overrideAccess: false,
      }),
    ])

    const hasConfiguredIdentity = Boolean(siteSettings.siteName?.trim())

    if (!hasConfiguredIdentity || siteSettings.defaultSEO?.noIndex) return []

    const staticEntries = baseStaticEntries.filter((entry) => {
      if (entry.url.endsWith('/about')) return !about.seo?.noIndex
      if (entry.url.endsWith('/contact')) return !contact.seo?.noIndex
      return true
    })

    const projectEntries: MetadataRoute.Sitemap = projects.docs
      .filter((project) => !project.seo?.noIndex)
      .map((project) => ({
        changeFrequency: 'monthly',
        lastModified: new Date(project.updatedAt),
        priority: project.featured ? 0.8 : 0.7,
        url: site + '/portfolio/' + project.slug,
      }))

    const journalEntries: MetadataRoute.Sitemap = posts.docs
      .filter((post) => !post.seo?.noIndex)
      .map((post) => ({
        changeFrequency: 'monthly',
        lastModified: new Date(post.updatedAt),
        priority: post.featured ? 0.75 : 0.65,
        url: site + '/journal/' + post.slug,
      }))

    return [...staticEntries, ...projectEntries, ...journalEntries]
  } catch {
    return []
  }
}
