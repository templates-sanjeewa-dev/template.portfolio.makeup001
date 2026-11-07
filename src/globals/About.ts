import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  admin: {
    group: 'Website Pages',
    description: 'The artist’s public profile: point of view, portrait, real credibility details, and conversion copy. Keep this personal and specific rather than generic biography text.',
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    readVersions: ({ req }) => Boolean(req.user),
  },
  versions: {
    max: 30,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'heading',
      type: 'text',
      maxLength: 180,
    },
    {
      name: 'lead',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'A concise personal positioning statement. Explain how the artist approaches beauty or how clients should expect the work to feel.',
      },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Use a strong, current artist portrait or real artist-at-work image. Avoid generic stock photography for a real client launch.',
      },
    },
    {
      name: 'story',
      type: 'richText',
      admin: {
        description: 'Tell the real story behind the practice: point of view, working philosophy, relevant background, and what matters in the client experience. First person is encouraged when it sounds natural.',
      },
    },
    {
      name: 'credentials',
      type: 'array',
      maxRows: 12,
      admin: {
        description: 'Only add credibility details that are true and useful: training, specialisms, real awards, years/roles that can be supported, or genuine experience. Never invent press, clients, awards, or numerical claims.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 120,
        },
        {
          name: 'detail',
          type: 'text',
          maxLength: 240,
        },
      ],
    },
    {
      name: 'cta',
      label: 'Call to action',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          maxLength: 60,
        },
        {
          name: 'url',
          type: 'text',
          maxLength: 500,
        },
      ],
    },
    seoGroup(),
  ],
}
