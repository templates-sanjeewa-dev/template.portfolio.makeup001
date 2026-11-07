import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Media Library',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    description:
      'Photography and visual assets. For premium results, upload original high-resolution images with intentional portrait/wide crops, accurate alt text, and photographer credit where appropriate.',
    hideAPIURL: true,
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternative text',
      type: 'text',
      required: false,
      maxLength: 240,
      admin: {
        description:
          'Describe what is visibly important in the image. Avoid phrases like “image of”. Keep it useful for accessibility first, SEO second.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description:
          'Optional editorial caption. Use it for useful story/context, not to repeat the alternative text.',
      },
    },
    {
      name: 'credit',
      label: 'Photo credit',
      type: 'text',
      maxLength: 160,
      admin: {
        description:
          'Optional photographer or creative credit. Add it whenever attribution is appropriate or contractually required.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // Sharp-based transforms are intentionally disabled because this project targets Cloudflare Workers.
    crop: false,
    focalPoint: false,
  },
}
