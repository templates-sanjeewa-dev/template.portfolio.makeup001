import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoGroup } from '../fields/seo'
import { slugField } from '../fields/slug'
import { servicePreviewURL } from '../lib/admin-preview'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Services & Reviews',
    defaultColumns: ['title', 'featured', 'sortOrder', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'shortDescription'],
    description: 'Client-facing services. Write each one to help a visitor decide whether the experience fits their occasion—not as a dense price list.',
    hideAPIURL: true,
    preview: (doc) => servicePreviewURL(doc),
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  defaultSort: 'sortOrder',
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 30,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 120,
      index: true,
      admin: {
        description: 'Public service name shown on the Services page and enquiry form.',
      },
    },
    slugField(),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: {
        description: 'Write a concise 1–2 sentence decision hook: who/what the service is for, the feeling it creates, or the kind of occasion it suits.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Use this for the useful details that help someone enquire confidently: experience, likely inclusions, preparation, timing context, or what makes this service different. Avoid legal/booking terms here.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Choose photography that communicates the experience of this service—not just another generic portrait. Process/getting-ready imagery is especially useful for Bridal or group services.',
      },
    },
    {
      name: 'priceLabel',
      label: 'Price / starting price label',
      type: 'text',
      maxLength: 80,
      admin: {
        description: 'Optional public guidance only. Examples: “From $250”, “By enquiry”, or “Custom quote”. Do not imply a final price if travel, timing, group size, or brief can change it.',
      },
    },
    {
      name: 'durationLabel',
      label: 'Duration label',
      type: 'text',
      maxLength: 80,
      admin: {
        description: 'Optional public guidance such as “90–120 min”, “Bridal morning”, or “Half / full day”. Keep it human-readable rather than operational.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured services can appear in prominent homepage/service sections.',
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
    seoGroup(),
  ],
}
