import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type {
  About,
  Contact,
  PortfolioProject,
  Service,
  SiteSetting,
  Testimonial,
} from '@/payload-types'
import config from '@/payload.config'
import {
  demoAbout,
  demoPortfolioProjects,
  demoServices,
  demoSiteSettings,
  demoTestimonials,
} from '@/lib/demo-content'

export type ServicesPageData = {
  services: Service[]
  siteSettings: SiteSetting | null
  testimonials: Testimonial[]
}

export type AboutPageData = {
  about: About | null
  projects: PortfolioProject[]
  services: Service[]
  siteSettings: SiteSetting | null
  testimonials: Testimonial[]
}

export type ContactPageData = {
  contact: Contact | null
  services: Service[]
  siteSettings: SiteSetting | null
}

export const getServicesPageData = cache(async (): Promise<ServicesPageData> => {
  const preview = (await draftMode()).isEnabled

  try {
    const payload = await getPayload({ config })

    const [services, testimonials, siteSettings] = await Promise.all([
      payload.find({
        collection: 'services',
        depth: 2,
        draft: preview,
        limit: 100,
        overrideAccess: preview,
        sort: 'sortOrder',
      }),
      payload.find({
        collection: 'testimonials',
        depth: 2,
        limit: 6,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
    ])

    return {
      services: services.docs.length ? services.docs : demoServices,
      siteSettings: siteSettings?.siteName?.trim() ? siteSettings : demoSiteSettings,
      testimonials: testimonials.docs.length ? testimonials.docs : demoTestimonials,
    }
  } catch {
    return {
      services: demoServices,
      siteSettings: demoSiteSettings,
      testimonials: demoTestimonials,
    }
  }
})

export const getAboutPageData = cache(async (): Promise<AboutPageData> => {
  try {
    const payload = await getPayload({ config })

    const [about, siteSettings, testimonials, projects, services] = await Promise.all([
      payload.findGlobal({
        slug: 'about',
        depth: 2,
        overrideAccess: false,
      }),
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'testimonials',
        depth: 2,
        limit: 5,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        limit: 4,
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
    ])

    const hasAboutContent = Boolean(
      about.heading ||
        about.lead ||
        about.portrait ||
        about.story ||
        about.credentials?.length,
    )

    return {
      about: hasAboutContent ? about : demoAbout,
      projects: projects.docs.length ? projects.docs : demoPortfolioProjects.slice(0, 4),
      services: services.docs.length ? services.docs : demoServices,
      siteSettings: siteSettings?.siteName?.trim() ? siteSettings : demoSiteSettings,
      testimonials: testimonials.docs.length ? testimonials.docs : demoTestimonials,
    }
  } catch {
    return {
      about: demoAbout,
      projects: demoPortfolioProjects.slice(0, 4),
      services: demoServices,
      siteSettings: demoSiteSettings,
      testimonials: demoTestimonials,
    }
  }
})

export const getContactPageData = cache(async (): Promise<ContactPageData> => {
  try {
    const payload = await getPayload({ config })

    const [contact, services, siteSettings] = await Promise.all([
      payload.findGlobal({
        slug: 'contact',
        depth: 1,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'services',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
        overrideAccess: false,
      }),
    ])

    return {
      contact,
      services: services.docs.length ? services.docs : demoServices,
      siteSettings: siteSettings?.siteName?.trim() ? siteSettings : demoSiteSettings,
    }
  } catch {
    return {
      contact: null,
      services: demoServices,
      siteSettings: demoSiteSettings,
    }
  }
})
