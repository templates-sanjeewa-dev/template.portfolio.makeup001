import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Settings',
    description: 'Source of truth for the artist/business identity, direct contact details, real social profiles, and default search metadata.',
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    readVersions: ({ req }) => Boolean(req.user),
  },
  versions: {
    max: 25,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Main website/business name used in browser titles and fallback branding.',
      },
    },
    {
      name: 'artistName',
      type: 'text',
      maxLength: 120,
      admin: {
        description: 'Use the exact professional name the artist wants clients to see across the website.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      maxLength: 180,
      admin: {
        description: 'A short, ownable brand line. Avoid vague luxury language that could belong to any makeup artist.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Two or three concise sentences describing the real practice, type of work, and point of view. This now supports high-visibility brand areas such as the footer.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoMark',
      label: 'Logo mark / monogram',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'group',
      admin: {
        description: 'Primary contact details used on the Contact page and footer.',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
          maxLength: 50,
          admin: {
            description: 'Use international format for the WhatsApp number, for example +94771234567.',
          },
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp number',
          type: 'text',
          maxLength: 50,
        },
        {
          name: 'serviceArea',
          label: 'Primary service area',
          type: 'text',
          maxLength: 180,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Only add real, active public profiles the artist wants clients to visit. These are used as visible trust/contact signals in the footer and About page.',
      },
      maxRows: 10,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          maxLength: 80,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          maxLength: 500,
        },
      ],
    },
    seoGroup({
      name: 'defaultSEO',
      label: 'Default SEO',
      description:
        'Site-wide fallback metadata and social image. Important: enabling “Hide from search engines” here applies the no-index fallback across the public site and also removes entries from the dynamic sitemap.',
    }),
  ],
}
