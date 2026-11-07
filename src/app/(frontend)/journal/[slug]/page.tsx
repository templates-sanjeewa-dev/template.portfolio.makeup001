import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CmsImage } from '@/components/media/CmsImage'
import { RichText } from '@/components/rich-text/RichText'
import { LinkButton } from '@/components/ui/LinkButton'
import { getJournalMedia, getJournalPostData } from '@/lib/journal-data'
import { getReadingTime } from '@/lib/reading-time'
import { absoluteURL, getSiteURL } from '@/lib/seo'
import { getShellData } from '@/lib/site-data'

import styles from './article.module.css'

export const dynamic = 'force-dynamic'

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

const formatDate = (value: string | null | undefined) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const [{ post }, { siteSettings }] = await Promise.all([
    getJournalPostData(slug),
    getShellData(),
  ])

  if (!post) return { title: 'Journal article' }

  const seoImage = getJournalMedia(post.seo?.image) || getJournalMedia(post.featuredImage)
  const imageURL = absoluteURL(seoImage?.url)
  const canonicalPath = '/journal/' + post.slug
  const title = post.seo?.title || post.title
  const description = post.seo?.description || post.excerpt
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const tags = post.tags?.map((tag) => tag.label) || []

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description,
    keywords: tags.length ? tags : undefined,
    openGraph: {
      authors: [artistName],
      description,
      images: imageURL ? [{ alt: seoImage?.alt || post.title, url: imageURL }] : undefined,
      modifiedTime: post.updatedAt,
      publishedTime: post.publishedAt || post.createdAt,
      tags: tags.length ? tags : undefined,
      title,
      type: 'article',
      url: canonicalPath,
    },
    robots:
      post.seo?.noIndex || post._status === 'draft'
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

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const [{ nextPost, post, relatedPosts }, { siteSettings }] = await Promise.all([
    getJournalPostData(slug),
    getShellData(),
  ])

  if (!post) notFound()

  const featuredImage = getJournalMedia(post.featuredImage)
  const nextImage = nextPost ? getJournalMedia(nextPost.featuredImage) : null
  const published = formatDate(post.publishedAt)
  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const readingTime = getReadingTime(post.content)
  const canonicalURL = getSiteURL() + '/journal/' + post.slug
  const imageURL = absoluteURL(featuredImage?.url)
  const tags = post.tags?.map((tag) => tag.label) || []

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: {
      '@type': 'Person',
      name: artistName,
      url: getSiteURL() + '/about',
    },
    dateModified: post.updatedAt,
    datePublished: post.publishedAt || post.createdAt,
    description: post.seo?.description || post.excerpt,
    headline: post.title,
    image: imageURL ? [imageURL] : undefined,
    keywords: tags.length ? tags.join(', ') : undefined,
    mainEntityOfPage: canonicalURL,
    publisher: {
      '@type': 'Person',
      name: artistName,
      url: getSiteURL() + '/about',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: getSiteURL(),
        name: 'Home',
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: getSiteURL() + '/journal',
        name: 'Journal',
        position: 2,
      },
      {
        '@type': 'ListItem',
        item: canonicalURL,
        name: post.title,
        position: 3,
      },
    ],
  }

  return (
    <article className={styles.page}>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]).replace(/</g, '\u003c'),
        }}
        type="application/ld+json"
      />

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTopline}>
            <Link href="/journal">← Journal</Link>
            <span>{published || 'Journal story'}</span>
          </div>

          <p className={styles.eyebrow}>
            {post.tags?.[0]?.label ? 'Journal / ' + post.tags[0].label : 'Journal / Story'}
          </p>
          <h1>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.meta}>
            <span>{readingTime} min read</span>
            <Link className={styles.authorLink} href="/about">
              By {artistName}
            </Link>
            {post._status === 'draft' && <span>Draft preview</span>}
          </div>

          {post.tags?.length ? (
            <div className={styles.tags}>
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag.id || tag.label}>{tag.label}</span>
              ))}
            </div>
          ) : null}
        </div>

        <figure className={styles.heroImage}>
          {featuredImage ? (
            <CmsImage image={featuredImage} priority sizes="(max-width: 760px) 100vw, 52vw" />
          ) : (
            <div className={styles.placeholder} />
          )}
          <figcaption>
            <span>Journal</span>
            <span>{artistName}</span>
          </figcaption>
        </figure>
      </header>

      <section className={styles.article}>
        <div className={styles.body}>
          <RichText data={post.content} />
        </div>
      </section>

      {relatedPosts.length ? (
        <section className={styles.related}>
          <div className={styles.relatedHeading}>
            <div>
              <span>Related reading</span>
              <h2>Continue with the same thread.</h2>
            </div>
            <p>
              More useful reading connected by topic, preparation, or the same part of the beauty
              experience.
            </p>
          </div>

          <div className={styles.relatedGrid}>
            {relatedPosts.slice(0, 3).map((related) => {
              const image = getJournalMedia(related.featuredImage)

              return (
                <Link className={styles.relatedCard} href={'/journal/' + related.slug} key={related.id}>
                  <div className={styles.relatedImage}>
                    {image ? (
                      <CmsImage image={image} sizes="(max-width: 760px) 100vw, 33vw" />
                    ) : (
                      <div className={styles.placeholder} />
                    )}
                  </div>
                  <div className={styles.relatedMeta}>
                    <span>{getReadingTime(related.content)} min read</span>
                    <h3>{related.title}</h3>
                    <p>{related.excerpt}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.cta}>
        <div>
          <span>From reading to planning</span>
          <h2>Make the direction personal to your own occasion.</h2>
        </div>
        <div>
          <p>
            If you are planning a wedding, event, portrait, or editorial project, use the ideas as
            a starting point and share the real date, place, and service you need.
          </p>
          <div className={styles.ctaActions}>
            <LinkButton href="/contact">Request availability</LinkButton>
            <LinkButton href="/services" variant="text">
              Explore services
            </LinkButton>
          </div>
        </div>
      </section>

      {nextPost && (
        <section className={styles.next}>
          <Link href={'/journal/' + nextPost.slug}>
            <div className={styles.nextCopy}>
              <span>Next in the Journal</span>
              <h2>{nextPost.title}</h2>
              <p>{nextPost.excerpt}</p>
              <strong>Continue reading ↗</strong>
            </div>
            <div className={styles.nextImage}>
              {nextImage ? (
                <CmsImage image={nextImage} sizes="(max-width: 760px) 100vw, 42vw" />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>
          </Link>
        </section>
      )}
    </article>
  )
}
