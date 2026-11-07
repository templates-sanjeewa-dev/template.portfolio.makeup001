import type { Metadata } from 'next'
import Link from 'next/link'

import { EditorialCTA } from '@/components/content/EditorialCTA'
import { Testimonials } from '@/components/content/Testimonials'
import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getServicesPageData } from '@/lib/business-data'
import type { Media } from '@/payload-types'

import styles from './services.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: '/services',
  },
  description:
    'Bridal, engagement, editorial, occasion, and bespoke makeup services with a refined consultation-led approach.',
  openGraph: {
    description:
      'Bridal, engagement, editorial, occasion, and bespoke makeup services with a refined consultation-led approach.',
    title: 'Services',
    type: 'website',
  },
  title: 'Services',
  twitter: {
    card: 'summary',
    description:
      'Bridal, engagement, editorial, occasion, and bespoke makeup services with a refined consultation-led approach.',
    title: 'Services',
  },
}

const getMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const faqs = [
  {
    question: 'How do I know which service is right for me?',
    answer:
      'Start with the occasion rather than the package name. Share the date, location, number of people, and the kind of finish you are drawn to. The artist can then confirm which service fits the brief.',
  },
  {
    question: 'Does sending an enquiry confirm my booking?',
    answer:
      'No. An enquiry checks availability and opens the conversation. Timing, scope, final pricing, and any booking steps are confirmed personally afterward.',
  },
  {
    question: 'When should I enquire?',
    answer:
      'As soon as the date and general location are known. Popular wedding and event dates can fill early, while editorial and portrait work may be arranged on a shorter lead time depending on availability.',
  },
  {
    question: 'What should I include in my first message?',
    answer:
      'The most useful details are your date, location or venue, approximate number of people, the service or occasion, and a short note about the look or feeling you want.',
  },
  {
    question: 'Are the prices shown final?',
    answer:
      'Price labels are guidance for the service format. Final scope is confirmed personally because travel, timing, group size, and the nature of the brief can change what is required.',
  },
  {
    question: 'What about travel, trials, or larger groups?',
    answer:
      'Include those details in the enquiry if they matter to your plans. Travel, trials, additional people, and schedule requirements can then be discussed in the context of your actual date and service.',
  },
]

const process = [
  {
    number: '01',
    title: 'Share the brief',
    body: 'Send the date, location, people involved, and the kind of occasion or visual direction you have in mind.',
  },
  {
    number: '02',
    title: 'Check availability',
    body: 'The diary and practical requirements are checked against the service and timing you need.',
  },
  {
    number: '03',
    title: 'Confirm the details',
    body: 'If the date aligns, the service format, timing, investment, and any next steps are confirmed personally.',
  },
  {
    number: '04',
    title: 'Prepare calmly',
    body: 'Once confirmed, you know what to expect and can arrive with the right timing, references, and preparation in place.',
  },
]

export default async function ServicesPage() {
  const { services, siteSettings, testimonials } = await getServicesPageData()
  const serviceArea = siteSettings?.contact?.serviceArea || 'Available by enquiry'
  const serviceSignal =
    services
      .slice(0, 3)
      .map((service) => service.title)
      .filter(Boolean)
      .join(' / ') || 'Bridal / Editorial / Occasion'

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMarker}>
          <span>Services</span>
          <span>{services.length} offerings</span>
        </div>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow}>{serviceSignal}</p>
          <h1>Beauty services shaped around the person, not a formula.</h1>
          <p className={styles.heroLead}>
            From wedding mornings to editorial sets, every service begins with the occasion, the
            timing, the skin, and how you want the finished work to feel.
          </p>

          <div className={styles.heroActions}>
            <LinkButton href="#service-guide">Find your service</LinkButton>
            <LinkButton href="/contact" variant="text">
              Check availability
            </LinkButton>
          </div>
        </div>

        <div className={styles.heroFacts}>
          <div>
            <span>Service area</span>
            <strong>{serviceArea}</strong>
          </div>
          <div>
            <span>Booking style</span>
            <strong>Enquiry first</strong>
          </div>
          <div>
            <span>Pricing</span>
            <strong>Guidance + confirmed scope</strong>
          </div>
        </div>
      </header>

      {services.length ? (
        <>
          <section className={styles.guide} id="service-guide">
            <div className={styles.guideHeading}>
              <div>
                <span>Service guide</span>
                <h2>Begin with the occasion.</h2>
              </div>
              <p>
                You do not need to know the exact package before enquiring. Compare the context,
                timing, and investment guidance below, then open the service that feels closest.
              </p>
            </div>

            <div className={styles.guideList}>
              {services.map((service) => (
                <Link href={'#' + service.slug} key={service.id}>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                  </div>
                  <div className={styles.guideFacts}>
                    {service.durationLabel && <span>{service.durationLabel}</span>}
                    {service.priceLabel && <strong>{service.priceLabel}</strong>}
                  </div>
                  <span aria-hidden="true" className={styles.guideArrow}>
                    ↓
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.process}>
            <div className={styles.processHeading}>
              <span>The process</span>
              <div>
                <p className={styles.darkEyebrow}>From enquiry to appointment</p>
                <h2>A clear process, without the hard sell.</h2>
              </div>
            </div>

            <div className={styles.processGrid}>
              {process.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.offerings}>
            <div className={styles.offeringsHeading}>
              <span>Services in detail</span>
              <div>
                <h2>Choose by context, not by pressure.</h2>
                <p>
                  Each service explains what it is designed for, the likely timing or format, and
                  how to start the conversation.
                </p>
              </div>
            </div>

            <div className={styles.serviceList}>
              {services.map((service) => {
                const image = getMedia(service.image)

                return (
                  <article className={styles.service} id={service.slug} key={service.id}>
                    <figure className={styles.serviceImage}>
                      {image ? (
                        <CmsImage image={image} sizes="(max-width: 760px) 100vw, 45vw" />
                      ) : (
                        <div className={styles.placeholder} />
                      )}
                      <figcaption>{service.title}</figcaption>
                    </figure>

                    <div className={styles.serviceCopy}>
                      <h2>{service.title}</h2>
                      <p className={styles.shortDescription}>{service.shortDescription}</p>

                      <dl className={styles.serviceDetails}>
                        <div>
                          <dt>Timing / format</dt>
                          <dd>{service.durationLabel || 'Confirmed with the brief'}</dd>
                        </div>
                        <div>
                          <dt>Investment</dt>
                          <dd>{service.priceLabel || 'By enquiry'}</dd>
                        </div>
                      </dl>

                      {service.description && (
                        <div className={styles.serviceNarrative}>
                          <p className={styles.detailsLabel}>Service details</p>
                          <div className={styles.richText}>
                            <RichText data={service.description} />
                          </div>
                        </div>
                      )}

                      <div className={styles.serviceAction}>
                        <p>
                          Share your date, location, number of people, and what you are planning.
                        </p>
                        <LinkButton href={'/contact?service=' + encodeURIComponent(service.slug)}>
                          Enquire about {service.title}
                        </LinkButton>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className={styles.preparation}>
            <div className={styles.preparationHeading}>
              <span>Before you enquire</span>
              <div>
                <h2>The right details make the first reply more useful.</h2>
                <p>
                  You do not need a perfect brief. A few practical details are enough to begin.
                </p>
              </div>
            </div>

            <div className={styles.preparationGrid}>
              <article>
                <h3>Date + location</h3>
                <p>Share the date and the venue, city, or approximate location if it is known.</p>
              </article>
              <article>
                <h3>People + timing</h3>
                <p>Include roughly how many people need makeup and any important ready-by time.</p>
              </article>
              <article>
                <h3>Look + feeling</h3>
                <p>
                  References are welcome, but describing how you want the finished look to feel is
                  just as useful.
                </p>
              </article>
            </div>
          </section>

          <section className={styles.faq}>
            <div className={styles.faqHeading}>
              <span>Common questions</span>
              <div>
                <h2>Practical answers, before the conversation begins.</h2>
                <p>
                  Booking details vary by date and brief, but these answers cover the questions that
                  usually matter first.
                </p>
              </div>
            </div>

            <div className={styles.faqList}>
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>
                    <strong>{item.question}</strong>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className={styles.empty}>
          <p>Services by enquiry</p>
          <h2>Tell me what you’re planning.</h2>
          <span>
            Service details are being updated. Share your date, location, and occasion and I’ll
            help you find the right starting point.
          </span>
          <LinkButton href="/contact">Request availability</LinkButton>
        </section>
      )}

      <Testimonials items={testimonials.slice(0, 3)} title="What the service felt like, not just how it looked." />

      <EditorialCTA
        body="Share the date, location, number of people, and the kind of occasion you are planning. If you are unsure which service fits, that is completely fine."
        eyebrow="Private consultation"
        href="/contact"
        label="Request availability"
        title="Begin with what you know."
      />
    </div>
  )
}
