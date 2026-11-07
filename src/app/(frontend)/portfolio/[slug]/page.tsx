import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CmsImage } from '@/components/media/CmsImage'
import { ProjectGallery } from '@/components/portfolio/ProjectGallery'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getPortfolioProjectPageData } from '@/lib/portfolio-data'
import { absoluteURL } from '@/lib/seo'
import type { Media, PortfolioCategory, PortfolioProject } from '@/payload-types'

import styles from './project.module.css'

export const dynamic = 'force-dynamic'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const getCategory = (
  value: number | PortfolioCategory | null | undefined,
): PortfolioCategory | null =>
  value && typeof value === 'object' && 'title' in value ? value : null

const formatDate = (value: string | null | undefined) => {
  if (!value) return null

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

const ProjectNavCard = ({
  direction,
  project,
}: {
  direction: 'Previous' | 'Next'
  project: PortfolioProject
}) => {
  const image = getMedia(project.heroImage)
  const category = getCategory(project.category)

  return (
    <Link className={styles.navCard} href={'/portfolio/' + project.slug}>
      <div className={styles.navImage}>
        {image ? <CmsImage image={image} sizes="(max-width: 760px) 100vw, 50vw" /> : null}
      </div>
      <div className={styles.navOverlay} />
      <div className={styles.navCopy}>
        <div>
          <span>{direction} project</span>
          <small>{category?.title || 'Portfolio'}</small>
        </div>
        <div className={styles.navTitleRow}>
          <h3>{project.title}</h3>
          <strong aria-hidden="true">{direction === 'Previous' ? '←' : '↗'}</strong>
        </div>
      </div>
    </Link>
  )
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const { project } = await getPortfolioProjectPageData(slug)

  if (!project) {
    return {
      title: 'Portfolio project',
    }
  }

  const canonicalPath = '/portfolio/' + project.slug
  const seoImage = getMedia(project.seo?.image) || getMedia(project.heroImage)
  const imageURL = absoluteURL(seoImage?.url)
  const title = project.seo?.title || project.title
  const description =
    project.seo?.description ||
    project.excerpt ||
    'A makeup artistry project from the portfolio.'

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description,
    openGraph: {
      description,
      images: imageURL ? [{ alt: seoImage?.alt || project.title, url: imageURL }] : undefined,
      title,
      type: 'website',
      url: canonicalPath,
    },
    robots:
      project.seo?.noIndex || project._status === 'draft'
        ? { follow: false, index: false }
        : undefined,
    title,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      description,
      images: imageURL ? [imageURL] : undefined,
      title,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const { nextProject, position, previousProject, project, totalProjects } =
    await getPortfolioProjectPageData(slug)

  if (!project) notFound()

  const heroImage = getMedia(project.heroImage)
  const category = getCategory(project.category)
  const date = formatDate(project.eventDate)
  const galleryCount = project.gallery?.length || 0
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroNav}>
            <Link className={styles.backLink} href="/portfolio">
              ← All work
            </Link>
            {position > 0 && totalProjects > 0 ? (
              <span className={styles.storyPosition}>
                Story {String(position).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
              </span>
            ) : null}
          </div>

          <p className={styles.eyebrow}>{category?.title || 'Portfolio project'}</p>
          <h1>{project.title}</h1>
          {project.excerpt && <p className={styles.excerpt}>{project.excerpt}</p>}

          <dl className={styles.details}>
            {project.clientName && (
              <div>
                <dt>Study</dt>
                <dd>{project.clientName}</dd>
              </div>
            )}
            {project.location && (
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
            )}
            {date && (
              <div>
                <dt>Date</dt>
                <dd>{date}</dd>
              </div>
            )}
            <div>
              <dt>Images</dt>
              <dd>{galleryCount + 1} frames</dd>
            </div>
          </dl>
        </div>

        <figure className={styles.heroImage}>
          {heroImage ? (
            <CmsImage image={heroImage} priority sizes="(max-width: 760px) 100vw, 56vw" />
          ) : (
            <div className={styles.placeholder} />
          )}
          <figcaption>
            <span>{category?.title || 'Portfolio'}</span>
            <span>{project.location || 'Selected work'}</span>
          </figcaption>
        </figure>
      </header>

      {project.story && (
        <section className={styles.story}>
          <p className={styles.sectionLabel}>Beauty direction</p>

          <div className={styles.storyContent}>
            <RichText data={project.story} />
          </div>
        </section>
      )}

      {project.gallery?.length ? (
        <section className={styles.gallerySection}>
          <div className={styles.galleryHeading}>
            <p className={styles.sectionLabel}>Image story</p>
            <div>
              <h2>A closer look at the finished work and the details around it.</h2>
              <p>
                Portrait, preparation, texture, and atmosphere are paced as one story rather than a
                row of interchangeable images.
              </p>
            </div>
            <span className={styles.galleryCount}>
              {project.gallery.length} gallery frame
              {project.gallery.length === 1 ? '' : 's'}
            </span>
          </div>

          <ProjectGallery gallery={project.gallery} />
        </section>
      ) : null}

      <section className={styles.enquiry}>
        <p className={styles.sectionLabel}>Your occasion</p>

        <div className={styles.enquiryCopy}>
          <p className={styles.eyebrow}>Availability</p>
          <h2>Drawn to this kind of finish?</h2>
          <p>
            Share the date, location, service, and what you liked about this project. An enquiry can
            begin with a texture, level of polish, or simply the overall feeling.
          </p>
        </div>

        <div className={styles.enquiryActions}>
          <LinkButton href="/contact">Start an enquiry</LinkButton>
          <LinkButton href="/services" variant="text">
            Explore services
          </LinkButton>
        </div>
      </section>

      {(previousProject || nextProject) && (
        <section className={styles.projectNavigation}>
          <div className={styles.navigationHeading}>
            <span>Continue the portfolio</span>
            <p>More complete beauty stories from the selected work.</p>
          </div>

          <div className={styles.navigationGrid}>
            {previousProject && <ProjectNavCard direction="Previous" project={previousProject} />}
            {nextProject && <ProjectNavCard direction="Next" project={nextProject} />}
          </div>
        </section>
      )}
    </article>
  )
}
