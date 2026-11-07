'use client'

import Link from 'next/link'
import { startTransition, useMemo, useState } from 'react'

import { CmsImage } from '@/components/media/CmsImage'
import type { PortfolioCardData, PortfolioFilterData } from '@/lib/portfolio-data'

import styles from './PortfolioBrowser.module.css'

type PortfolioBrowserProps = {
  categories: PortfolioFilterData[]
  projects: PortfolioCardData[]
}

export function PortfolioBrowser({ categories, projects }: PortfolioBrowserProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'all'
        ? projects
        : projects.filter((project) => project.categorySlug === activeCategory),
    [activeCategory, projects],
  )

  const activeContext = useMemo(() => {
    if (activeCategory === 'all') {
      return {
        description:
          'A complete edit of bridal, editorial, engagement, and occasion work—each project treated as a visual story rather than a single finished face.',
        title: 'All work',
      }
    }

    const category = categories.find((item) => item.slug === activeCategory)

    return {
      description:
        category?.description ||
        'A focused edit from the portfolio, curated around the occasion and the visual language of the work.',
      title: category?.title || 'Selected work',
    }
  }, [activeCategory, categories])

  const setFilter = (slug: string) => {
    startTransition(() => {
      setActiveCategory(slug)
    })
  }

  if (!projects.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyEyebrow}>Selected work</p>
        <h2>New work is being prepared.</h2>
        <p>
          The portfolio is currently being updated. If you’re planning an occasion, you can still
          get in touch to discuss the date, service, and direction.
        </p>
        <Link className={styles.emptyLink} href="/contact">
          Check availability ↗
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.browser}>
      <div aria-label="Filter portfolio projects" className={styles.filters} role="group">
        <button
          aria-pressed={activeCategory === 'all'}
          className={activeCategory === 'all' ? styles.activeFilter : undefined}
          onClick={() => setFilter('all')}
          type="button"
        >
          <span>All</span>
          <small>{projects.length}</small>
        </button>

        {categories.map((category) => {
          const count = projects.filter(
            (project) => project.categorySlug === category.slug,
          ).length

          if (!count) return null

          return (
            <button
              aria-pressed={activeCategory === category.slug}
              className={activeCategory === category.slug ? styles.activeFilter : undefined}
              key={category.slug}
              onClick={() => setFilter(category.slug)}
              type="button"
            >
              <span>{category.title}</span>
              <small>{count}</small>
            </button>
          )
        })}
      </div>

      <div className={styles.activeContext} key={'context-' + activeCategory}>
        <div>
          <span>Current edit</span>
          <h2>{activeContext.title}</h2>
        </div>
        <p>{activeContext.description}</p>
        <strong>
          {visibleProjects.length} stor
          {visibleProjects.length === 1 ? 'y' : 'ies'}
        </strong>
      </div>

      <div aria-live="polite" className={styles.grid} key={activeCategory}>
        {visibleProjects.map((project, index) => (
          <Link
            className={styles.card}
            data-layout={index % 4 === 0 ? 'lead' : index % 4 === 3 ? 'wide' : 'standard'}
            href={'/portfolio/' + project.slug}
            key={project.id}
          >
            <div className={styles.imageFrame}>
              {project.image ? (
                <CmsImage
                  image={project.image}
                  priority={activeCategory === 'all' && index < 2}
                  sizes={
                    index % 4 === 0 || index % 4 === 3
                      ? '(max-width: 700px) 100vw, 56vw'
                      : '(max-width: 700px) 100vw, 34vw'
                  }
                />
              ) : (
                <div aria-hidden="true" className={styles.placeholder} />
              )}

              <div className={styles.viewCue}>
                <span>View project</span>
                <span aria-hidden="true">↗</span>
              </div>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaMain}>
                <p>{project.categoryTitle}</p>
                <h3>{project.title}</h3>
                {project.excerpt && <span className={styles.excerpt}>{project.excerpt}</span>}
              </div>
              <div className={styles.metaSide}>
                {project.location && <span>{project.location}</span>}
                {project.year && <span>{project.year}</span>}
                <span>{project.galleryCount + 1} frames</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
