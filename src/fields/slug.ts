import type { TextField } from 'payload'

const toSlug = (input: string) =>
  input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (sourceField = 'title'): TextField => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL-friendly identifier. Leave blank to generate it from the title.',
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === 'string' && value.trim()) {
          return toSlug(value)
        }

        const source =
          siblingData && typeof siblingData === 'object'
            ? (siblingData as Record<string, unknown>)[sourceField]
            : undefined

        return typeof source === 'string' ? toSlug(source) : value
      },
    ],
  },
})
