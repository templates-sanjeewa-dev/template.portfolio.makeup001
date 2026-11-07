import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'clientName',
    group: 'Services & Reviews',
    defaultColumns: ['clientName', 'service', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['clientName', 'quote', 'location'],
    description: 'Real client reviews used as trust evidence across the website. Keep attribution accurate and never create synthetic or paraphrased praise that is presented as a client quote.',
    hideAPIURL: true,
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Use the real client name or the exact attribution the client has approved for public display.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 1200,
      admin: {
        description: 'Use the client’s own words. Light trimming for length is fine, but do not rewrite the meaning or manufacture stronger praise.',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Connect the review to the relevant Service when known. This context is displayed publicly and makes the testimonial more useful.',
      },
    },
    {
      name: 'location',
      type: 'text',
      maxLength: 160,
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional client portrait. Use only when the client has given permission for public display.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured reviews are preferred for high-visibility testimonial sections.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
