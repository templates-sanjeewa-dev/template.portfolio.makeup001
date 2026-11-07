import type { Metadata } from 'next'
import Link from 'next/link'

import { EditorialCTA } from '@/components/content/EditorialCTA'
import { Testimonials } from '@/components/content/Testimonials'
import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getAboutPageData } from '@/lib/business-data'
import { absoluteURL } from '@/lib/seo'
import type { Media } from '@/payload-types'

import styles from './about.module.css'

export const dynamic = 'force-dynamic'

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const isExternal = (url: string) => /^https?:\/\//i.test(url)

export async function generateMetadata(): Promise<Metadata> {
  const { about, siteSettings } = await getAboutPageData()
  const seoImage = getMedia(about?.seo?.image) || getMedia(about?.portrait)
  const imageURL = absoluteURL(seoImage?.url)
  const title = about?.seo?.title || 'About'
  const description =
    about?.seo?.description ||
    about?.lead ||
    siteSettings?.shortDescription ||
    'Meet the makeup artist and discover the philosophy behind the work.'

  return {
    alternates: {
      canonical: '/about',
    },
    description,
    openGraph: {
      description,
      images: imageURL ? [{ alt: seoImage?.alt || title, url: imageURL }] : undefined,
      title,
      type: 'profile',
      url: '/about',
    },
    robots: about?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      description,
      images: imageURL ? [imageURL] : undefined,
      title,
    },
  }
}

export default async function AboutPage() {
  const { about, projects, services, siteSettings, testimonials } = await getAboutPageData()

  const portrait = getMedia(about?.portrait)
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'The artist'
  const tagline = siteSettings?.tagline || 'Makeup artistry'
  const serviceArea = siteSettings?.contact?.serviceArea || 'Available by enquiry'
  const email = siteSettings?.contact?.email
  const socialLinks = siteSettings?.socialLinks ?? []
  const primaryServiceSignal =
    services
      .slice(0, 3)
      .map((service) => service.title)
      .filter(Boolean)
      .join(' / ') || 'Private bookings'

  const visualProjects = projects
    .map((project) => ({
      ...project,
      resolvedImage: getMedia(project.heroImage),
    }))
    .filter((project) => Boolean(project.resolvedImage))
    .slice(0, 3)

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTopline}>
            <span>About</span>
            <span>{serviceArea}</span>
          </div>

          <p className={styles.eyebrow}>{artistName}</p>
          <h1>{about?.heading || 'Beauty with a personal point of view.'}</h1>
          <p className={styles.lead}>
            {about?.lead ||
              'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.'}
          </p>

          <div className={styles.heroActions}>
            <LinkButton href="/portfolio">View selected work</LinkButton>
            <LinkButton href={about?.cta?.url || '/contact'} variant="text">
              {about?.cta?.label || 'Check availability'}
            </LinkButton>
          </div>

          <div className={styles.identity}>
            <div>
              <span>Artist</span>
              <strong>{artistName}</strong>
            </div>
            <div>
              <span>Practice</span>
              <strong>{tagline}</strong>
            </div>
          </div>
        </div>

        <figure className={styles.portrait}>
          {portrait ? (
            <CmsImage image={portrait} priority sizes="(max-width: 760px) 100vw, 52vw" />
          ) : (
            <div className={styles.placeholder}>
              <span>Artist portrait</span>
            </div>
          )}
          <figcaption>
            <span>{artistName}</span>
            <span>{tagline}</span>
          </figcaption>
        </figure>
      </header>

      <section className={styles.quickFacts}>
        <div>
          <p>Based / serving</p>
          <strong>{serviceArea}</strong>
        </div>
        <div>
          <p>Available for</p>
          <strong>{primaryServiceSignal}</strong>
        </div>
        <div>
          <p>Approach</p>
          <strong>Personal, calm, detail-led</strong>
        </div>
      </section>

      <section className={styles.story}>
        <p className={styles.sectionLabel}>The artist</p>

        <div className={styles.storyMain}>
          <p className={styles.eyebrow}>{about?.eyebrow || 'Behind the work'}</p>
          {about?.story ? (
            <div className={styles.storyContent}>
              <RichText data={about.story} />
            </div>
          ) : (
            <div className={styles.storyFallback}>
              <h2>Technique matters. So does the way the experience feels.</h2>
              <p>
                The work is approached with care, restraint, and respect for the person in the
                chair. The aim is not to cover or transform for the sake of it, but to make every
                detail feel intentional.
              </p>
            </div>
          )}
        </div>

        <aside className={styles.storyAside}>
          <p>What matters in the chair</p>
          <div>
            <strong>Listening first</strong>
          </div>
          <div>
            <strong>Preparation before product</strong>
          </div>
          <div>
            <strong>A finish that still feels like you</strong>
          </div>
        </aside>
      </section>

      {about?.credentials?.length ? (
        <section className={styles.credentials}>
          <div className={styles.credentialsHeading}>
            <p className={styles.sectionLabelDark}>Experience & specialisms</p>
            <div>
              <p className={styles.darkEyebrow}>Specific, useful credibility</p>
              <h2>The details that support the work.</h2>
            </div>
          </div>

          <div className={styles.credentialList}>
            {about.credentials.map((credential, index) => (
              <article className={styles.credential} key={credential.id || String(index)}>
                <h3>{credential.title}</h3>
                {credential.detail && <p>{credential.detail}</p>}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {visualProjects.length ? (
        <section className={styles.work}>
          <div className={styles.workHeading}>
            <div>
              <span>Selected work</span>
              <h2>The point of view should be visible in the work.</h2>
            </div>
            <div className={styles.workIntro}>
              <p>
                Three projects that show how the approach changes with the face, the light, and the
                occasion without losing the same standard of finish.
              </p>
              <LinkButton href="/portfolio" variant="text">
                Explore the portfolio
              </LinkButton>
            </div>
          </div>

          <div className={styles.workGrid}>
            {visualProjects.map((project, index) => (
              <Link className={styles.workCard} href={'/portfolio/' + project.slug} key={project.id}>
                <div className={styles.workImage}>
                  <CmsImage
                    image={project.resolvedImage as Media}
                    sizes={
                      index === 0
                        ? '(max-width: 760px) 100vw, 50vw'
                        : '(max-width: 760px) 100vw, 28vw'
                    }
                  />
                </div>
                <div className={styles.workMeta}>
                  <div>
                    <p>
                      {typeof project.category === 'object' && project.category
                        ? project.category.title
                        : 'Portfolio'}
                    </p>
                    <h3>{project.title}</h3>
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.practice}>
        <div className={styles.practiceHeading}>
          <p className={styles.sectionLabel}>Working together</p>
          <div>
            <p className={styles.eyebrow}>Services & enquiry</p>
            <h2>Different occasions. One standard of attention.</h2>
          </div>
        </div>

        <div className={styles.practiceGrid}>
          <div className={styles.serviceList}>
            {services.map((service) => (
              <Link href={'/services#' + service.slug} key={service.id}>
                <div>
                  <strong>{service.title}</strong>
                  <small>{service.priceLabel || 'By enquiry'}</small>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>

          <div className={styles.contactCard}>
            <p>Start with the practical details.</p>
            <h3>Date, place, people, and how you want the finished look to feel.</h3>
            <span>
              You do not need a perfect brief. The first message is simply a way to check
              availability and understand what the occasion needs.
            </span>
            <LinkButton href="/contact">Request availability</LinkButton>

            {(email || socialLinks.length) && (
              <div className={styles.contactLinks}>
                {email && <a href={'mailto:' + email}>{email}</a>}
                {socialLinks.map((social) => (
                  <a
                    href={social.url}
                    key={social.platform + '-' + social.url}
                    rel={isExternal(social.url) ? 'noreferrer' : undefined}
                    target={isExternal(social.url) ? '_blank' : undefined}
                  >
                    {social.label || social.platform} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials.slice(0, 3)} title="What clients remember about the experience." />

      <EditorialCTA
        body="If the approach feels right for you, share the date, location, and a little about what you are planning. The first step is simply checking availability."
        eyebrow="Work together"
        href={about?.cta?.url || '/contact'}
        label={about?.cta?.label || 'Request availability'}
        title="A good fit starts with a simple conversation."
      />
    </div>
  )
}
