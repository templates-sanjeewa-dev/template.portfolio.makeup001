import { getPayload } from 'payload'

import type {
  About,
  Home,
  JournalPost,
  Navigation,
  PortfolioProject,
  Service,
  SiteSetting,
  Testimonial,
} from '@/payload-types'
import config from '@/payload.config'
import {
  demoAbout,
  demoJournalPosts,
  demoNavigation,
  demoPortfolioProjects,
  demoServices,
  demoSiteSettings,
  demoTestimonials,
} from '@/lib/demo-content'

export type ShellData = {
  navigation: Navigation | null
  siteSettings: SiteSetting | null
}

export type HomePageData = {
  about: About | null
  home: Home | null
  journalPosts: JournalPost[]
  projects: PortfolioProject[]
  services: Service[]
  testimonial: Testimonial | null
  testimonials: Testimonial[]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object'

export const isResolvedRelationship = <T extends { id: number }>(
  value: number | T | null | undefined,
): value is T => isRecord(value) && typeof value.id === 'number'

const mergeUniqueById = <T extends { id: number }>(primary: T[], secondary: T[]) => {
  const seen = new Set<number>()

  return [...primary, ...secondary].filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

export async function getShellData(): Promise<ShellData> {
  try {
    const payload = await getPayload({ config })

    const [siteSettings, navigation] = await Promise.all([
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: 'navigation',
        depth: 1,
        overrideAccess: false,
      }),
    ])

    const hasIdentity = Boolean(siteSettings?.siteName?.trim())
    const hasNavigation = Boolean(navigation?.headerLinks?.length || navigation?.footerLinks?.length)

    return {
      navigation: hasNavigation ? navigation : demoNavigation,
      siteSettings: hasIdentity ? siteSettings : demoSiteSettings,
    }
  } catch {
    return {
      navigation: demoNavigation,
      siteSettings: demoSiteSettings,
    }
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const payload = await getPayload({ config })

    const home = await payload.findGlobal({
      slug: 'home',
      depth: 2,
      overrideAccess: false,
    })

    const selectedProjects = (home.featuredProjects ?? []).filter(
      (project): project is PortfolioProject => isResolvedRelationship(project),
    )

    const selectedServices = (home.featuredServices ?? []).filter(
      (service): service is Service => isResolvedRelationship(service),
    )

    const selectedTestimonial = isResolvedRelationship(home.featuredTestimonial)
      ? home.featuredTestimonial
      : null

    const [projectResult, serviceResult, testimonialResult, journalResult, about] =
      await Promise.all([
        payload.find({
          collection: 'portfolio-projects',
          depth: 2,
          limit: 6,
          overrideAccess: false,
          sort: 'sortOrder',
        }),
        payload.find({
          collection: 'services',
          depth: 1,
          limit: 5,
          overrideAccess: false,
          sort: 'sortOrder',
        }),
        payload.find({
          collection: 'testimonials',
          depth: 1,
          limit: 4,
          overrideAccess: false,
          sort: 'sortOrder',
        }),
        payload.find({
          collection: 'journal-posts',
          depth: 1,
          limit: 3,
          overrideAccess: false,
          sort: '-publishedAt',
        }),
        payload.findGlobal({
          slug: 'about',
          depth: 2,
          overrideAccess: false,
        }),
      ])

    const projects = mergeUniqueById(selectedProjects, projectResult.docs).slice(0, 6)
    const services = mergeUniqueById(selectedServices, serviceResult.docs).slice(0, 5)
    const testimonialPool = mergeUniqueById(
      selectedTestimonial ? [selectedTestimonial] : [],
      testimonialResult.docs,
    ).slice(0, 4)

    const hasAboutContent = Boolean(
      about.heading ||
        about.lead ||
        about.portrait ||
        about.story ||
        about.credentials?.length,
    )

    return {
      about: hasAboutContent ? about : demoAbout,
      home,
      journalPosts: journalResult.docs.length ? journalResult.docs : demoJournalPosts.slice(0, 3),
      projects: projects.length ? projects : demoPortfolioProjects.slice(0, 6),
      services: services.length ? services : demoServices.slice(0, 5),
      testimonial: testimonialPool[0] ?? demoTestimonials[0] ?? null,
      testimonials: testimonialPool.length ? testimonialPool : demoTestimonials.slice(0, 4),
    }
  } catch {
    return {
      about: demoAbout,
      home: null,
      journalPosts: demoJournalPosts.slice(0, 3),
      projects: demoPortfolioProjects.slice(0, 6),
      services: demoServices.slice(0, 5),
      testimonial: demoTestimonials[0] ?? null,
      testimonials: demoTestimonials.slice(0, 4),
    }
  }
}
