import type { GlobalConfig } from 'payload'

import { seoGroup } from '../fields/seo'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  admin: {
    group: 'Website Pages',
    description: 'Copy for the private consultation / availability experience. Keep it calm, clear, and low-pressure.',
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
      admin: {
        description: 'Primary Contact-page statement. Keep it conversational and action-oriented, for example “Tell me what you’re planning.”',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      maxLength: 600,
      admin: {
        description: 'Explain what to include in the first message and reassure visitors that the enquiry is an availability check, not an instant booking.',
      },
    },
    {
      name: 'enquiryHeading',
      label: 'Enquiry form heading',
      type: 'text',
      maxLength: 140,
      admin: {
        description: 'Heading above the four-part consultation brief. Keep it short, e.g. “Share the details.”',
      },
    },
    {
      name: 'availabilityNote',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional current availability, travel, lead-time, or booking-window note. Keep it factual and update it when circumstances change.',
      },
    },
    {
      name: 'responseTime',
      label: 'Response-time note',
      type: 'text',
      maxLength: 180,
      admin: {
        description: 'Set a realistic reply expectation only if the artist can consistently meet it.',
      },
    },
    {
      name: 'successMessage',
      label: 'Successful submission message',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Shown immediately after a successful submission. Confirm receipt and explain the expected next step without implying the booking is confirmed.',
      },
    },
    seoGroup(),
  ],
}
