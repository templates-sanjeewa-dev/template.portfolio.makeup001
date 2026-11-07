import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type { Media, PortfolioCategory, PortfolioProject } from '@/payload-types'
import config from '@/payload.config'
import {
  demoPortfolioCategories,
  demoPortfolioProjects,
} from '@/lib/demo-content'

export type PortfolioCardData = {
  categorySlug: string
  categoryTitle: string
  excerpt: string | null
  galleryCount: number
  id: number
  image: Media | null
  location: string | null
  secondaryImage: Media | null
  slug: string
  title: string
  year: string | null
}

export type PortfolioFilterData = {
  description: string | null
  slug: string
  title: string
}

export type PortfolioIndexData = {
  categories: PortfolioFilterData[]
  featuredProject: PortfolioCardData | null
  projects: PortfolioCardData[]
}

export type PortfolioProjectPageData = {
  nextProject: PortfolioProject | null
  position: number
  previousProject: PortfolioProject | null
  project: PortfolioProject | null
  totalProjects: number
}

const resolvedCategory = (
  category: number | PortfolioCategory | null | undefined,
): PortfolioCategory | null =>
  category && typeof category === 'object' && 'slug' in category ? category : null

const resolvedMedia = (media: number | Media | null | undefined): Media | null =>
  media && typeof media === 'object' && 'url' in media ? media : null

const getYear = (value: string | null | undefined) => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : String(date.getFullYear())
}

const toCard = (project: PortfolioProject): PortfolioCardData => {
  const category = resolvedCategory(project.category)
  const secondaryImage =
    project.gallery
      ?.map((item) => resolvedMedia(item.image))
      .find((image): image is Media => Boolean(image)) ?? null

  return {
    categorySlug: category?.slug || 'uncategorized',
    categoryTitle: category?.title || 'Portfolio',
    excerpt: project.excerpt || null,
    galleryCount: project.gallery?.length || 0,
    id: project.id,
    image: resolvedMedia(project.heroImage),
    location: project.location || null,
    secondaryImage,
    slug: project.slug,
    title: project.title,
    year: getYear(project.eventDate),
  }
}

const demoCategories = demoPortfolioCategories.map((category) => ({
  description: category.description || null,
  slug: category.slug,
  title: category.title,
}))

const demoCards = demoPortfolioProjects.map(toCard)

export async function getPortfolioIndexData(): Promise<PortfolioIndexData> {
  const preview = (await draftMode()).isEnabled

  try {
    const payload = await getPayload({ config })

    const [categoryResult, projectResult] = await Promise.all([
      payload.find({
        collection: 'portfolio-categories',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: 'sortOrder',
      }),
      payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        draft: preview,
        limit: 100,
        overrideAccess: preview,
        sort: 'sortOrder',
      }),
    ])

    if (!projectResult.docs.length) {
      return {
        categories: demoCategories,
        featuredProject: demoCards[0] || null,
        projects: demoCards,
      }
    }

    const projects = projectResult.docs.map(toCard)
    const featuredSource =
      projectResult.docs.find((project) => project.featured) || projectResult.docs[0] || null

    return {
      categories: categoryResult.docs.map((category) => ({
        description: category.description || null,
        slug: category.slug,
        title: category.title,
      })),
      featuredProject: featuredSource ? toCard(featuredSource) : null,
      projects,
    }
  } catch {
    return {
      categories: demoCategories,
      featuredProject: demoCards[0] || null,
      projects: demoCards,
    }
  }
}

export const getPortfolioProjectPageData = cache(
  async (slug: string): Promise<PortfolioProjectPageData> => {
    const preview = (await draftMode()).isEnabled

    try {
      const payload = await getPayload({ config })

      const projectResult = await payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        draft: preview,
        limit: 1,
        overrideAccess: preview,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const project = projectResult.docs[0] || null

      if (!project) {
        const demoIndex = demoPortfolioProjects.findIndex((item) => item.slug === slug)
        const demoProject = demoIndex >= 0 ? demoPortfolioProjects[demoIndex] : null
        const totalProjects = demoPortfolioProjects.length
        const previousProject =
          demoProject && totalProjects > 2
            ? demoPortfolioProjects[(demoIndex - 1 + totalProjects) % totalProjects] || null
            : null
        const nextProject =
          demoProject && totalProjects > 1
            ? demoPortfolioProjects[(demoIndex + 1) % totalProjects] || null
            : null

        return {
          nextProject: nextProject?.id === demoProject?.id ? null : nextProject,
          position: demoProject ? demoIndex + 1 : 0,
          previousProject: previousProject?.id === demoProject?.id ? null : previousProject,
          project: demoProject,
          totalProjects,
        }
      }

      const allProjects = await payload.find({
        collection: 'portfolio-projects',
        depth: 2,
        draft: preview,
        limit: 100,
        overrideAccess: preview,
        sort: 'sortOrder',
      })

      const currentIndex = allProjects.docs.findIndex((item) => item.id === project.id)
      const totalProjects = allProjects.docs.length
      const previousProject =
        totalProjects > 2
          ? allProjects.docs[(currentIndex - 1 + totalProjects) % totalProjects] || null
          : null
      const nextProject =
        totalProjects > 1
          ? allProjects.docs[(currentIndex + 1) % totalProjects] || null
          : null

      return {
        nextProject: nextProject?.id === project.id ? null : nextProject,
        position: currentIndex + 1,
        previousProject: previousProject?.id === project.id ? null : previousProject,
        project,
        totalProjects,
      }
    } catch {
      const demoIndex = demoPortfolioProjects.findIndex((item) => item.slug === slug)
      const demoProject = demoIndex >= 0 ? demoPortfolioProjects[demoIndex] : null
      const totalProjects = demoPortfolioProjects.length
      const previousProject =
        demoProject && totalProjects > 2
          ? demoPortfolioProjects[(demoIndex - 1 + totalProjects) % totalProjects] || null
          : null
      const nextProject =
        demoProject && totalProjects > 1
          ? demoPortfolioProjects[(demoIndex + 1) % totalProjects] || null
          : null

      return {
        nextProject: nextProject?.id === demoProject?.id ? null : nextProject,
        position: demoProject ? demoIndex + 1 : 0,
        previousProject: previousProject?.id === demoProject?.id ? null : previousProject,
        project: demoProject,
        totalProjects,
      }
    }
  },
)
