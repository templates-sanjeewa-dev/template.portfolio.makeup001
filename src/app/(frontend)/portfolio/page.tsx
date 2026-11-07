import type { Metadata } from 'next'
import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import { PortfolioBrowser } from '@/components/portfolio/PortfolioBrowser'
import { LinkButton } from '@/components/ui/LinkButton'
import { getPortfolioIndexData } from '@/lib/portfolio-data'

import styles from './portfolio.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: '/portfolio',
  },
  description:
    'A curated portfolio of bridal, editorial, engagement, and occasion makeup artistry presented as complete visual stories.',
  openGraph: {
    description:
      'A curated portfolio of bridal, editorial, engagement, and occasion makeup artistry presented as complete visual stories.',
    title: 'Portfolio',
    type: 'website',
  },
  title: 'Portfolio',
}

export default async function PortfolioPage() {
  const { categories, featuredProject, projects } = await getPortfolioIndexData()
  const visibleCategories = categories.filter((category) =>
    projects.some((project) => project.categorySlug === category.slug),
  )
  const categorySignal =
    visibleCategories
      .slice(0, 3)
      .map((category) => category.title)
      .join(' / ') || 'Bridal / Editorial / Occasion'

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroMarker}>
          <span>Portfolio</span>
          <span>{projects.length} stories</span>
        </div>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow}>{categorySignal}</p>
          <h1>Selected work, shown in full stories.</h1>
          <p className={styles.heroLead}>
            A considered edit of makeup in context—finished portraits, preparation, texture,
            atmosphere, and the decisions that shape the final look.
          </p>
        </div>

        <div className={styles.heroCategories} aria-label="Portfolio categories">
          {visibleCategories.slice(0, 4).map((category) => (
            <span key={category.slug}>{category.title}</span>
          ))}
        </div>
      </section>

      {featuredProject?.image && (
        <section className={styles.featured}>
          <Link className={styles.featuredImage} href={'/portfolio/' + featuredProject.slug}>
            <CmsImage
              image={featuredProject.image}
              priority
              sizes="(max-width: 760px) 100vw, 62vw"
            />
            <span className={styles.featuredImageLabel}>Featured story</span>
          </Link>

          <div className={styles.featuredCopy}>
            <div className={styles.featuredTopline}>
              <span>Featured story</span>
              <span>{featuredProject.categoryTitle}</span>
            </div>

            <div>
              <p className={styles.eyebrow}>{featuredProject.categoryTitle}</p>
              <h2>{featuredProject.title}</h2>
              {featuredProject.excerpt && <p className={styles.featuredLead}>{featuredProject.excerpt}</p>}
            </div>

            <dl className={styles.featuredMeta}>
              <div>
                <dt>Location</dt>
                <dd>{featuredProject.location || 'Studio / on location'}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{featuredProject.year || 'Selected work'}</dd>
              </div>
              <div>
                <dt>Story</dt>
                <dd>{featuredProject.galleryCount + 1} frames</dd>
              </div>
            </dl>

            <LinkButton href={'/portfolio/' + featuredProject.slug}>View project</LinkButton>
          </div>
        </section>
      )}

      <section className={styles.archive}>
        <div className={styles.archiveHeading}>
          <div>
            <span>Portfolio archive</span>
            <h2>Browse by occasion, or see the complete edit.</h2>
          </div>
          <p>
            Each project opens as a full visual story. Use the categories to narrow the work without
            losing the rhythm of the portfolio.
          </p>
        </div>

        <PortfolioBrowser categories={visibleCategories} projects={projects} />
      </section>

      <section className={styles.closing}>
        <div>
          <span>Your occasion</span>
          <h2>Looking for a finish that feels this considered?</h2>
        </div>
        <div className={styles.closingCopy}>
          <p>
            Share the date, location, service, and the kind of finish you are drawn to. A useful
            enquiry can begin with a project, a texture, or simply a feeling.
          </p>
          <LinkButton href="/contact">Start an enquiry</LinkButton>
        </div>
      </section>
    </div>
  )
}
