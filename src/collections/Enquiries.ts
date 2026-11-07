import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: {
    singular: 'Enquiry',
    plural: 'Enquiries',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Business',
    defaultColumns: ['name', 'service', 'eventDate', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'location', 'message'],
    description: 'Prospective-client consultation requests. Review new enquiries promptly, use Status consistently, and keep private follow-up context in Internal notes.',
    hideAPIURL: true,
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && !req.user) {
          data.status = 'new'
          data.source = 'website'
          data.internalNotes = undefined
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 50,
    },
    {
      name: 'preferredContact',
      label: 'Preferred contact method',
      type: 'select',
      defaultValue: 'email',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
    },
    {
      name: 'eventDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      maxLength: 180,
    },
    {
      name: 'peopleCount',
      label: 'Number of people',
      type: 'number',
      min: 1,
      max: 100,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 3000,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Use consistently: New = unread/untriaged, In progress = being discussed, Replied = response sent, Closed = no further action, Spam = unwanted submission.',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Manual', value: 'manual' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Shows whether the enquiry came from the website or was entered manually.',
      },
    },
    {
      name: 'internalNotes',
      label: 'Internal notes',
      type: 'textarea',
      maxLength: 2000,
      admin: {
        description: 'Private follow-up notes for the artist/team: quote context, availability, pending questions, or next action. Never shown publicly.',
      },
    },
  ],
}
