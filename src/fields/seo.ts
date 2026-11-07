import type { GroupField } from 'payload'

type SEOGroupOptions = {
  name?: string
  label?: string
  description?: string
}

export const seoGroup = ({
  name = 'seo',
  label = 'SEO',
  description = 'Search and social sharing overrides. Leave blank to use the site defaults.',
}: SEOGroupOptions = {}): GroupField => ({
  name,
  label,
  type: 'group',
  admin: {
    description,
  },
  fields: [
    {
      name: 'title',
      label: 'Meta title',
      type: 'text',
      maxLength: 70,
      admin: {
        description:
          'Optional search/share title. Aim for a clear, specific phrase around 50–60 characters when practical. Do not repeat keywords unnaturally.',
      },
    },
    {
      name: 'description',
      label: 'Meta description',
      type: 'textarea',
      maxLength: 170,
      admin: {
        description:
          'Optional search description. Summarize the real page value in natural language; around 140–160 characters is a useful target, not a hard rule.',
      },
    },
    {
      name: 'image',
      label: 'Social sharing image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional social-sharing override. Use a strong landscape image when possible (roughly 1.91:1, e.g. 1200×630). Page photography remains the fallback.',
      },
    },
    {
      name: 'noIndex',
      label: 'Hide from search engines',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Use intentionally for content that should stay public but not appear in search results. Drafts are already protected; do not use this simply because a page is unfinished.',
      },
    },
  ],
})
