import type { GlobalConfig } from 'payload'

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    required: true,
    maxLength: 60,
  },
  {
    name: 'url',
    type: 'text' as const,
    required: true,
    maxLength: 500,
  },
  {
    name: 'newTab',
    label: 'Open in a new tab',
    type: 'checkbox' as const,
    defaultValue: false,
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Site Settings',
    description: 'Header and footer navigation shown throughout the public website.',
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
      name: 'headerLinks',
      type: 'array',
      maxRows: 8,
      admin: {
        description: 'Main navigation links shown in the website header.',
      },
      fields: linkFields,
    },
    {
      name: 'primaryCTA',
      label: 'Primary call to action',
      type: 'group',
      admin: {
        description: 'Primary header button, usually the enquiry/contact action.',
      },
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
    {
      name: 'footerLinks',
      type: 'array',
      maxRows: 12,
      admin: {
        description: 'Secondary navigation links shown in the footer.',
      },
      fields: linkFields,
    },
    {
      name: 'footerNote',
      type: 'text',
      maxLength: 240,
    },
  ],
}
