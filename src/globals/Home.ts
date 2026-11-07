import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  admin: {
    group: 'Website Pages',
    description: 'Editorial content and selections for the home page. Layout is controlled by the frontend.',
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
      name: 'hero',
      type: 'group',
      admin: {
        description: 'The cinematic opening message and lead photograph. Use one exceptional portrait with enough negative space for oversized typography.',
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
          name: 'subheading',
          type: 'textarea',
          maxLength: 420,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'primaryCTA',
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
      ],
    },
    {
      name: 'introduction',
      type: 'group',
      admin: {
        description: 'The belief/manifesto chapter immediately after the hero. Keep it concise, personal, and focused on the artist’s point of view.',
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
          name: 'body',
          type: 'richText',
        },
      ],
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'portfolio-projects',
      hasMany: true,
      admin: {
        description: 'Choose 4–6 strong projects. The first becomes the full-screen Signature Story; the following projects feed the photography essay and Selected Work chapters.',
      },
    },
    {
      name: 'featuredServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Choose 4–5 services. The first service image becomes the sticky visual in the dark service chapter; the list order controls the homepage sequence.',
      },
    },
    {
      name: 'featuredTestimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      admin: {
        description: 'Choose the strongest client quote. It is prioritized in the homepage trust sequence, with other featured testimonials filling the remaining positions.',
      },
    },
    {
      name: 'closingCTA',
      label: 'Closing call to action',
      type: 'group',
      admin: {
        description: 'Final full-photography booking invitation. Keep the message simple and confident; this is the strongest conversion moment on the page.',
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
          name: 'body',
          type: 'textarea',
          maxLength: 420,
        },
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
  ],
}
