import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'
import { journalPreviewURL } from '../lib/admin-preview'

const setFirstPublishedAt: CollectionBeforeChangeHook = ({ data, operation, originalDoc }) => {
  if (
    (operation === 'create' || operation === 'update') &&
    data._status === 'published' &&
    !data.publishedAt &&
    !originalDoc?.publishedAt
  ) {
    data.publishedAt = new Date().toISOString()
  }

  return data
}

export const JournalPosts: CollectionConfig = {
  slug: 'journal-posts',
  labels: {
    singular: 'Journal Post',
    plural: 'Journal',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Journal',
    defaultColumns: ['title', 'publishedAt', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    description:
      'Publish useful beauty guidance and artist stories that answer real client questions. Prioritize original experience, clear structure, and internal relevance over keyword volume. Save drafts freely and use Preview before publishing.',
    hideAPIURL: true,
    preview: (doc) => journalPreviewURL(doc),
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  defaultSort: '-publishedAt',
  hooks: {
    beforeChange: [setFirstPublishedAt],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 40,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 160,
      index: true,
      admin: {
        description:
          'The human-facing editorial headline. Make the topic clear enough that a reader understands the value immediately; the SEO group can provide a shorter search-title override when needed.',
      },
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 360,
      admin: {
        description:
          'Write 1–2 useful sentences that explain what the reader will learn. This appears on Journal cards and becomes the default search description when no SEO override is provided.',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Choose an article-specific editorial image, not a generic repeated portrait. It appears in Journal listings, the article hero, and social sharing when no SEO image override exists.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description:
          'Write the complete article here. Use descriptive headings, firsthand expertise, concrete advice, and natural internal references to relevant Services/Portfolio topics. Avoid filler written only to increase word count.',
      },
    },
    {
      name: 'publishedAt',
      label: 'Published date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description:
          'Filled automatically the first time the post is published. Change it only when the editorial date should be different.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Featured stories receive the lead position on the public Journal page. Keep this selective.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      maxRows: 8,
      admin: {
        description:
          'Reader-facing topics used for Journal discovery and related-story matching. Reuse a small consistent vocabulary such as Bridal, Skin, Editorial, Preparation, or Behind the Scenes; do not create near-duplicate tags for keywords.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: 50,
          admin: {
            description: 'Short human-readable topic label. Prefer an existing topic spelling/capitalization when possible.',
          },
        },
      ],
    },
    seoGroup({
      description:
        'Optional search/social overrides for this article. Leave blank to use the title, excerpt, featured image, and site defaults.',
    }),
  ],
}
