import type { Metadata } from 'next'
import Link from 'next/link'

import { CmsImage } from '@/components/media/CmsImage'
import { LinkButton } from '@/components/ui/LinkButton'
import { demoHeroImage } from '@/lib/demo-content'
import { getReadingTime } from '@/lib/reading-time'
import { richTextToPlainText } from '@/lib/rich-text'
import { getHomePageData, getShellData, isResolvedRelationship } from '@/lib/site-data'
import type { Media, Service } from '@/payload-types'

import styles from './home.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const formatJournalDate = (value: string | null | undefined) => {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const projectCategory = (project: { category?: unknown }) =>
  typeof project.category === 'object' &&
  project.category &&
  'title' in project.category &&
  typeof project.category.title === 'string'
    ? project.category.title
    : 'Portfolio'

export default async function HomePage() {
  const [
    { about, home, journalPosts, projects, services, testimonial, testimonials },
    { siteSettings },
  ] = await Promise.all([getHomePageData(), getShellData()])

  const hero = home?.hero
  const heroImage = isResolvedRelationship<Media>(hero?.image) ? hero.image : demoHeroImage
  const siteName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const serviceArea = siteSettings?.contact?.serviceArea || 'Sri Lanka'
  const introText = richTextToPlainText(home?.introduction?.body)
  const artistPortrait = isResolvedRelationship<Media>(about?.portrait) ? about.portrait : null

  const testimonialService = (value: number | Service | null | undefined) =>
    value && typeof value === 'object' && 'title' in value ? value : null

  const selectedProjects = projects.slice(0, 3)
  const leadService = services.find((service) => isResolvedRelationship<Media>(service.image)) || services[0] || null
  const leadServiceImage =
    leadService && isResolvedRelationship<Media>(leadService.image) ? leadService.image : null

  const closingProject =
    projects.find(
      (project) =>
        typeof project.category === 'object' &&
        project.category?.slug === 'bridal' &&
        isResolvedRelationship<Media>(project.heroImage),
    ) || projects.find((project) => isResolvedRelationship<Media>(project.heroImage))

  const closingGalleryImage =
    closingProject?.gallery
      ?.map((item) => (isResolvedRelationship<Media>(item.image) ? item.image : null))
      .find((image): image is Media => Boolean(image && image.id !== heroImage.id)) || null

  const closingImage =
    closingGalleryImage ||
    (closingProject && isResolvedRelationship<Media>(closingProject.heroImage)
      ? closingProject.heroImage
      : heroImage)

  const clientNotes = (testimonials.length ? testimonials : testimonial ? [testimonial] : []).slice(0, 3)
  const serviceSignals = services
    .slice(0, 3)
    .map((service) => service.title)
    .filter(Boolean)

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy + ' editorial-rise'}>
            <div className={styles.heroMeta}>
              <span>Independent makeup artistry</span>
              <span>{serviceArea}</span>
            </div>

            <p className={styles.eyebrow}>{hero?.eyebrow || 'Bridal / Editorial / Occasion'}</p>
            <h1>{hero?.heading || 'Beauty, shaped with intention.'}</h1>
            <p className={styles.heroLead}>
              {hero?.subheading ||
                'Refined makeup for weddings, portraits, campaigns, and modern occasions—created to feel considered, personal, and recognisably you.'}
            </p>

            <div className={styles.heroActions}>
              <LinkButton href={hero?.primaryCTA?.url || '/portfolio'}>
                {hero?.primaryCTA?.label || 'View selected work'}
              </LinkButton>
              <LinkButton href="/contact" variant="text">
                Check availability
              </LinkButton>
            </div>

            <p className={styles.heroAvailability}>
              {(serviceSignals.length ? serviceSignals.join(' · ') : 'Bridal · Editorial · Occasion') +
                ' · ' +
                serviceArea}
            </p>
          </div>

          <figure className={styles.heroVisual + ' editorial-fade'}>
            <CmsImage image={heroImage} priority sizes="(max-width: 760px) 100vw, 52vw" />
            <figcaption>
              <span>{siteName}</span>
              <span>Selected portfolio</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.sectionLabel}>
          {home?.introduction?.eyebrow || 'Point of view'}
        </p>

        <div className={styles.introStatement}>
          <h2>
            {home?.introduction?.heading ||
              'Makeup that reads beautifully in person and in photographs.'}
          </h2>
          <p>
            {introText ||
              'The approach is skin-led, detail-conscious, and never overworked. Every look is shaped around the person, the setting, the light, and the way the day needs to feel.'}
          </p>
        </div>

        <div className={styles.introFacts}>
          <div>
            <span>Approach</span>
            <strong>Skin-first, detail-led</strong>
          </div>
          <div>
            <span>Available for</span>
            <strong>Weddings, portraits & campaigns</strong>
          </div>
          <div>
            <span>Based / serving</span>
            <strong>{serviceArea}</strong>
          </div>
        </div>
      </section>

      {selectedProjects.length ? (
        <section className={styles.work}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Portfolio / Selected work</p>
              <h2>Beauty stories, not isolated looks.</h2>
            </div>
            <div className={styles.sectionAside}>
              <p>
                A concise edit of bridal, portrait, and editorial work—chosen for skin, atmosphere,
                detail, and the complete visual story.
              </p>
              <LinkButton href="/portfolio" variant="text">
                Explore the portfolio
              </LinkButton>
            </div>
          </div>

          <div className={styles.projectGrid}>
            {selectedProjects.map((project, index) => {
              const image = isResolvedRelationship<Media>(project.heroImage)
                ? project.heroImage
                : null

              return (
                <Link
                  className={styles.projectCard}
                  data-size={index === 0 ? 'lead' : 'support'}
                  href={'/portfolio/' + project.slug}
                  key={project.id}
                >
                  <div className={styles.projectImage}>
                    {image && (
                      <CmsImage
                        image={image}
                        sizes={
                          index === 0
                            ? '(max-width: 760px) 100vw, 58vw'
                            : '(max-width: 760px) 100vw, 30vw'
                        }
                      />
                    )}
                  </div>
                  <div className={styles.projectMeta}>
                    <div>
                      <p>{projectCategory(project)}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesHeading}>
            <p className={styles.sectionLabelDark}>Services</p>
            <div>
              <p className={styles.eyebrowDark}>The offering</p>
              <h2>Different occasions. One standard of attention.</h2>
            </div>
          </div>

          <div className={styles.servicesBody}>
            {leadServiceImage && (
              <figure className={styles.serviceVisual}>
                <CmsImage image={leadServiceImage} sizes="(max-width: 760px) 100vw, 38vw" />
                <figcaption>Preparation / presence / finish</figcaption>
              </figure>
            )}

            <div className={styles.serviceList}>
              {services.slice(0, 5).map((service) => (
                <Link className={styles.serviceRow} href={'/services#' + service.slug} key={service.id}>
                  <div className={styles.serviceCopy}>
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                    <div className={styles.serviceFacts}>
                      {service.durationLabel && <span>{service.durationLabel}</span>}
                      {service.priceLabel && <span>{service.priceLabel}</span>}
                    </div>
                  </div>
                  <span aria-hidden="true" className={styles.serviceArrow}>
                    ↗
                  </span>
                </Link>
              ))}

              <div className={styles.servicesFooter}>
                <p>
                  Every booking begins with the occasion, timing, location, and the level of finish
                  that feels right for you.
                </p>
                <LinkButton href="/services" variant="outline">
                  View all services
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {about && artistPortrait ? (
        <section className={styles.artist}>
          <div className={styles.artistGrid}>
            <figure className={styles.artistImage}>
              <CmsImage image={artistPortrait} sizes="(max-width: 760px) 100vw, 43vw" />
              <figcaption>Behind the work</figcaption>
            </figure>

            <div className={styles.artistCopy}>
              <p className={styles.sectionLabel}>The artist</p>
              <p className={styles.eyebrow}>{about.eyebrow || 'A personal practice'}</p>
              <h2>{about.heading || 'Beauty with a personal point of view.'}</h2>
              <p className={styles.artistLead}>
                {about.lead ||
                  'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.'}
              </p>

              {about.credentials?.length ? (
                <div className={styles.artistCredentials}>
                  {about.credentials.slice(0, 3).map((credential) => (
                    <div key={credential.id || credential.title}>
                      <strong>{credential.title}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              <LinkButton href="/about" variant="text">
                Meet the artist
              </LinkButton>
            </div>
          </div>
        </section>
      ) : null}

      {clientNotes.length ? (
        <section className={styles.voices}>
          <div className={styles.voicesHeading}>
            <p className={styles.sectionLabel}>Client experience</p>
            <div>
              <p className={styles.eyebrow}>What should stay with you</p>
              <h2>The experience should feel as considered as the finished look.</h2>
            </div>
          </div>

          <div className={styles.voiceGrid}>
            {clientNotes.map((item) => {
              const portrait = isResolvedRelationship<Media>(item.portrait) ? item.portrait : null
              const service = testimonialService(item.service)

              return (
                <article className={styles.voice} key={item.id}>
                  {portrait && (
                    <div className={styles.voicePortrait}>
                      <CmsImage image={portrait} sizes="3rem" />
                    </div>
                  )}
                  <blockquote>“{item.quote}”</blockquote>
                  <div className={styles.voicePerson}>
                    <strong>{item.clientName}</strong>
                    <span>
                      {[service?.title, item.location].filter(Boolean).join(' / ') || 'Client note'}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {journalPosts.length ? (
        <section className={styles.journal}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Journal / Notes & stories</p>
              <h2>Useful beauty guidance, without the noise.</h2>
            </div>
            <div className={styles.sectionAside}>
              <p>
                Preparation, references, timing, skin, and the small decisions that make the work
                feel calm before the appointment even begins.
              </p>
              <LinkButton href="/journal" variant="text">
                Read the journal
              </LinkButton>
            </div>
          </div>

          <div className={styles.journalGrid}>
            {journalPosts.slice(0, 3).map((post, index) => {
              const image = isResolvedRelationship<Media>(post.featuredImage)
                ? post.featuredImage
                : null

              return (
                <article className={styles.journalCard} data-lead={index === 0 ? 'true' : 'false'} key={post.id}>
                  <Link href={'/journal/' + post.slug}>
                    <div className={styles.journalImage}>
                      {image && (
                        <CmsImage
                          image={image}
                          sizes={
                            index === 0
                              ? '(max-width: 760px) 100vw, 50vw'
                              : '(max-width: 760px) 100vw, 25vw'
                          }
                        />
                      )}
                    </div>

                    <div className={styles.journalMeta}>
                      {formatJournalDate(post.publishedAt) && (
                        <span>{formatJournalDate(post.publishedAt)}</span>
                      )}
                      <span>{getReadingTime(post.content)} min</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.closing}>
        <div className={styles.closingGrid}>
          <figure className={styles.closingVisual}>
            <CmsImage image={closingImage} sizes="(max-width: 760px) 100vw, 48vw" />
          </figure>

          <div className={styles.closingContent}>
            <p className={styles.sectionLabel}>Availability · {serviceArea}</p>
            <p className={styles.eyebrow}>{home?.closingCTA?.eyebrow || 'Start with the details'}</p>
            <h2>{home?.closingCTA?.heading || 'Tell me what you’re planning.'}</h2>
            <p className={styles.closingLead}>
              {home?.closingCTA?.body ||
                'Share the date, location, service, and anything useful about the occasion. Availability, timing, and the next step can be confirmed from there.'}
            </p>

            <div className={styles.closingActions}>
              <LinkButton href={home?.closingCTA?.url || '/contact'}>
                {home?.closingCTA?.label || 'Start an enquiry'}
              </LinkButton>
              <span>No instant booking. No pressure.</span>
            </div>

            <div className={styles.closingFacts}>
              {(serviceSignals.length ? serviceSignals : ['Bridal', 'Editorial', 'Occasion']).map(
                (label) => (
                  <span key={label}>{label}</span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
