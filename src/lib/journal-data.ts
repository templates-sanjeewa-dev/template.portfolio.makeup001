import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type { JournalPost, Media } from '@/payload-types'
import config from '@/payload.config'
import { demoJournalPosts } from '@/lib/demo-content'

export type JournalTopic = {
  count: number
  label: string
  slug: string
}

export type JournalIndexData = {
  featured: JournalPost | null
  posts: JournalPost[]
  preview: boolean
  topics: JournalTopic[]
}

export type JournalPostData = {
  nextPost: JournalPost | null
  post: JournalPost | null
  preview: boolean
  relatedPosts: JournalPost[]
}

export const getJournalMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const previewState = async () => {
  const draft = await draftMode()
  return draft.isEnabled
}

const topicSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const getTopics = (posts: JournalPost[]): JournalTopic[] => {
  const topics = new Map<string, JournalTopic>()

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      const label = tag.label.trim()
      const slug = topicSlug(label)
      if (!slug) return

      const current = topics.get(slug)
      topics.set(slug, {
        count: (current?.count || 0) + 1,
        label: current?.label || label,
        slug,
      })
    })
  })

  return [...topics.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

const sharedTopicCount = (current: JournalPost, candidate: JournalPost) => {
  const currentTopics = new Set((current.tags ?? []).map((tag) => topicSlug(tag.label)))

  return (candidate.tags ?? []).reduce(
    (score, tag) => score + (currentTopics.has(topicSlug(tag.label)) ? 1 : 0),
    0,
  )
}

const relatedFrom = (post: JournalPost, source: JournalPost[]) =>
  source
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate, order) => ({
      candidate,
      order,
      score: sharedTopicCount(post, candidate),
    }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 3)
    .map(({ candidate }) => candidate)

export const getJournalIndexData = cache(async (): Promise<JournalIndexData> => {
  const preview = await previewState()

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'journal-posts',
      depth: 2,
      draft: preview,
      limit: 100,
      overrideAccess: preview,
      sort: '-publishedAt',
    })

    const source = result.docs.length ? result.docs : demoJournalPosts
    const featured = source.find((post) => post.featured) || source[0] || null
    const posts = featured ? source.filter((post) => post.id !== featured.id) : source

    return { featured, posts, preview, topics: getTopics(posts) }
  } catch {
    const featured = demoJournalPosts.find((post) => post.featured) || demoJournalPosts[0] || null
    const posts = featured
      ? demoJournalPosts.filter((post) => post.id !== featured.id)
      : demoJournalPosts

    return { featured, posts, preview, topics: getTopics(posts) }
  }
})

export const getJournalPostData = cache(async (slug: string): Promise<JournalPostData> => {
  const preview = await previewState()

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'journal-posts',
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

    const post = result.docs[0] || demoJournalPosts.find((item) => item.slug === slug) || null

    if (!post) {
      return { nextPost: null, post: null, preview, relatedPosts: [] }
    }

    if (post.id < 0) {
      const demoIndex = demoJournalPosts.findIndex((item) => item.id === post.id)
      const nextPost =
        demoJournalPosts.length > 1
          ? demoJournalPosts[(demoIndex + 1) % demoJournalPosts.length] || null
          : null

      return {
        nextPost: nextPost?.id === post.id ? null : nextPost,
        post,
        preview,
        relatedPosts: relatedFrom(post, demoJournalPosts),
      }
    }

    const all = await payload.find({
      collection: 'journal-posts',
      depth: 2,
      draft: preview,
      limit: 100,
      overrideAccess: preview,
      sort: '-publishedAt',
    })

    const currentIndex = all.docs.findIndex((item) => item.id === post.id)
    const nextPost =
      all.docs.length > 1
        ? all.docs[(currentIndex + 1) % all.docs.length] || null
        : null

    return {
      nextPost: nextPost?.id === post.id ? null : nextPost,
      post,
      preview,
      relatedPosts: relatedFrom(post, all.docs),
    }
  } catch {
    const demoIndex = demoJournalPosts.findIndex((item) => item.slug === slug)
    const post = demoIndex >= 0 ? demoJournalPosts[demoIndex] : null
    const nextPost =
      post && demoJournalPosts.length > 1
        ? demoJournalPosts[(demoIndex + 1) % demoJournalPosts.length] || null
        : null

    return {
      nextPost: nextPost?.id === post?.id ? null : nextPost,
      post,
      preview,
      relatedPosts: post ? relatedFrom(post, demoJournalPosts) : [],
    }
  }
})
