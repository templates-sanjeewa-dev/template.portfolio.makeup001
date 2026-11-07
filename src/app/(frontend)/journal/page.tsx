import type { Metadata } from 'next'
import Link from 'next/link'

import { JournalArchive } from '@/components/journal/JournalArchive'
import { CmsImage } from '@/components/media/CmsImage'
import { LinkButton } from '@/components/ui/LinkButton'
import { getJournalIndexData, getJournalMedia } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'

import styles from './journal.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: '/journal',
  },
  description:
    'Beauty notes, artist perspectives, wedding guidance, preparation advice, and editorial stories from the studio.',
  openGraph: {
    description:
      'Beauty notes, artist perspectives, wedding guidance, preparation advice, and editorial stories from the studio.',
    title: 'Journal',
    type: 'website',
  },
  title: 'Journal',
  twitter: {
    card: 'summary',
    description:
      'Beauty notes, artist perspectives, wedding guidance, preparation advice, and editorial stories from the studio.',
    title: 'Journal',
  },
}

const formatDate = (value: string | null | undefined) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default async function JournalPage() {
  const { featured, posts, topics } = await getJournalIndexData()
  const totalStories = posts.length + (featured ? 1 : 0)
  const topicSignal =
    topics
      .slice(0, 3)
      .map((topic) => topic.label)
      .filter(Boolean)
      .join(' / ') || 'Notes / Guidance / Behind the work'

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMarker}>
          <span>Journal</span>
          <span>{totalStories} stories</span>
        </div>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow}>{topicSignal}</p>
          <h1>Beauty, beyond the finished look.</h1>
          <p className={styles.heroLead}>
            Practical guidance, thoughtful observations, and stories from weddings, editorials,
            preparation, and the work behind the work.
          </p>
        </div>

        <div className={styles.heroTopics}>
          <span>Read by topic</span>
          {topics.slice(0, 5).map((topic) => (
            <div key={topic.slug}>
              <span>{topic.label}</span>
              <small>{topic.count}</small>
            </div>
          ))}
        </div>
      </header>

      {featured ? (
        <section className={styles.featured}>
          <Link className={styles.featuredImage} href={'/journal/' + featured.slug}>
            {getJournalMedia(featured.featuredImage) ? (
              <CmsImage
                image={getJournalMedia(featured.featuredImage)}
                priority
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            ) : (
              <div className={styles.placeholder} />
            )}
            <span>Featured story</span>
          </Link>

          <div className={styles.featuredCopy}>
            <div className={styles.featuredTopline}>
              <span>Featured story</span>
              <span>{formatDate(featured.publishedAt) || 'Journal'}</span>
            </div>

            <p className={styles.eyebrow}>
              {featured.tags?.[0]?.label || 'From the journal'}
            </p>
            <h2>{featured.title}</h2>
            <p className={styles.excerpt}>{featured.excerpt}</p>

            <div className={styles.featuredMeta}>
              <span>{getReadingTime(featured.content)} min read</span>
              {featured.tags?.slice(0, 3).map((tag) => (
                <span key={tag.id || tag.label}>{tag.label}</span>
              ))}
            </div>

            <LinkButton href={'/journal/' + featured.slug}>Read the story</LinkButton>
          </div>
        </section>
      ) : (
        <section className={styles.empty}>
          <p className={styles.eyebrow}>Journal</p>
          <h2>New notes are being prepared.</h2>
          <p>
            The Journal is currently being updated. In the meantime, explore the Services or get
            in touch about your own date and occasion.
          </p>
          <div className={styles.emptyActions}>
            <LinkButton href="/services">Explore services</LinkButton>
            <LinkButton href="/contact" variant="text">Check availability</LinkButton>
          </div>
        </section>
      )}

      {posts.length ? (
        <section className={styles.archive}>
          <div className={styles.archiveHeading}>
            <div>
              <span>Journal archive</span>
              <h2>Read by topic, not by noise.</h2>
            </div>

            <div className={styles.archiveIntro}>
              <p>
                Browse the complete Journal or narrow the edit to the subject that matters to you
                right now—preparation, skin, bridal planning, editorial work, or the process behind
                the finished image.
              </p>
            </div>
          </div>

          <JournalArchive posts={posts} topics={topics} />
        </section>
      ) : null}

      <section className={styles.closing}>
        <div>
          <span>From reading to planning</span>
          <h2>Found something useful for your own occasion?</h2>
        </div>
        <div>
          <p>
            Use the Journal for preparation and ideas, then move into Services or an enquiry when
            you are ready to talk about your own date, location, and direction.
          </p>
          <div className={styles.closingActions}>
            <LinkButton href="/services">Explore services</LinkButton>
            <LinkButton href="/contact" variant="text">
              Check availability
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  )
}
