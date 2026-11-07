import type { Metadata } from 'next'

import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { LinkButton } from '@/components/ui/LinkButton'
import { getContactPageData } from '@/lib/business-data'
import { makeTelURL, makeWhatsAppURL } from '@/lib/contact'
import { absoluteURL } from '@/lib/seo'
import type { Media } from '@/payload-types'

import styles from './contact.module.css'

export const dynamic = 'force-dynamic'

type ContactPageProps = {
  searchParams: Promise<{
    service?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getContactPageData()
  const seoImage =
    contact?.seo?.image && typeof contact.seo.image === 'object' && 'url' in contact.seo.image
      ? (contact.seo.image as Media)
      : null
  const imageURL = absoluteURL(seoImage?.url)
  const title = contact?.seo?.title || 'Contact'
  const description =
    contact?.seo?.description ||
    contact?.intro ||
    'Request makeup availability and share the details of your wedding, event, or editorial project.'

  return {
    alternates: {
      canonical: '/contact',
    },
    description,
    openGraph: {
      description,
      images: imageURL ? [{ alt: seoImage?.alt || title, url: imageURL }] : undefined,
      title,
      type: 'website',
      url: '/contact',
    },
    robots: contact?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title,
    twitter: {
      card: imageURL ? 'summary_large_image' : 'summary',
      description,
      images: imageURL ? [imageURL] : undefined,
      title,
    },
  }
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ service }, { contact, services, siteSettings }] = await Promise.all([
    searchParams,
    getContactPageData(),
  ])

  const email = siteSettings?.contact?.email
  const phone = siteSettings?.contact?.phone
  const whatsapp = makeWhatsAppURL(
    siteSettings?.contact?.whatsapp,
    'Hello, I would like to ask about makeup availability.',
  )
  const tel = makeTelURL(phone)
  const serviceArea = siteSettings?.contact?.serviceArea || 'Available by enquiry'
  const selectedService = services.find((item) => item.slug === service)
  const initialServiceSlug = selectedService?.slug

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMarker}>
          <span>Contact</span>
          <span>Availability enquiry</span>
        </div>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow}>{contact?.eyebrow || 'Private consultation'}</p>
          <h1>{contact?.heading || 'Tell me what you’re planning.'}</h1>
          <p className={styles.heroLead}>
            {contact?.intro ||
              'Share the date, location, service, and a little about the occasion. This first message is simply to check availability and understand what you need.'}
          </p>
        </div>

        <div className={styles.heroFacts}>
          <div>
            <span>Service area</span>
            <strong>{serviceArea}</strong>
          </div>
          <div>
            <span>Booking</span>
            <strong>Confirmed personally after availability</strong>
          </div>
        </div>
      </header>

      <section className={styles.enquiry}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarIntro}>
            <p>Direct contact</p>
            <h2>Start in the way that feels easiest.</h2>
            <span>
              The form gives the clearest availability brief, but email, phone, or WhatsApp are
              available when a direct conversation suits you better.
            </span>
          </div>

          <div className={styles.contactMethods}>
            {email && (
              <a href={'mailto:' + email}>
                <span>Email</span>
                <strong>{email}</strong>
              </a>
            )}
            {tel && phone && (
              <a href={tel}>
                <span>Phone</span>
                <strong>{phone}</strong>
              </a>
            )}
            <div>
              <span>Service area</span>
              <strong>{serviceArea}</strong>
            </div>
          </div>

          {whatsapp && (
            <LinkButton href={whatsapp} variant="outline">
              Message on WhatsApp
            </LinkButton>
          )}

          {(contact?.availabilityNote || contact?.responseTime) && (
            <div className={styles.contactNotes}>
              {contact?.availabilityNote && <p>{contact.availabilityNote}</p>}
              {contact?.responseTime && <p>{contact.responseTime}</p>}
            </div>
          )}
        </aside>

        <div className={styles.formArea}>
          <div className={styles.formHeading}>
            <div>
              <p>Availability enquiry</p>
              <h2>{contact?.enquiryHeading || 'Share the details.'}</h2>
            </div>
            <span>Three short parts · estimates are fine</span>

            {selectedService && (
              <div className={styles.selectedService}>
                <span>Selected service</span>
                <div>
                  <strong>{selectedService.title}</strong>
                  <div>
                    {selectedService.durationLabel && <span>{selectedService.durationLabel}</span>}
                    {selectedService.priceLabel && <span>{selectedService.priceLabel}</span>}
                  </div>
                </div>
                <a href="/services">Review services ↗</a>
              </div>
            )}
          </div>

          <EnquiryForm
            initialServiceSlug={initialServiceSlug}
            services={services}
            successMessage={
              contact?.successMessage ||
              'Your enquiry is safely in. I’ll review the details and reply as soon as possible.'
            }
          />
        </div>
      </section>

      <section className={styles.reassurance}>
        <div className={styles.reassuranceHeading}>
          <span>Before you send</span>
          <h2>No pressure, no instant booking.</h2>
          <p>
            An enquiry opens the conversation. Availability, timing, final pricing, and booking
            details are confirmed personally afterward.
          </p>
        </div>

        <div className={styles.reassuranceGrid}>
          <div>
            <strong>Estimates are okay.</strong>
            <p>You do not need every timeline detail finalized before checking availability.</p>
          </div>
          <div>
            <strong>You can be undecided.</strong>
            <p>Choose “Not sure yet” if you need help deciding which service fits the occasion.</p>
          </div>
          <div>
            <strong>References can come later.</strong>
            <p>The first message only needs enough context to understand the date and scope.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
