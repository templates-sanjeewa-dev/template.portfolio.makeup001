import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { admins, adminsOrSelf, createFirstUserOrAdmin } from '../access'

const promoteFirstUserToAdmin: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' || req.user) return data

  const existingUsers = await req.payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  if (existingUsers.totalDocs === 0) {
    data.role = 'admin'
  }

  return data
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Team',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    description: 'People who can sign in to manage the website.',
    hideAPIURL: true,
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
  },
  access: {
    admin: ({ req }) =>
      Boolean(
        req.user &&
          typeof req.user === 'object' &&
          'role' in req.user &&
          req.user.role === 'admin',
      ),
    create: createFirstUserOrAdmin,
    read: adminsOrSelf,
    update: adminsOrSelf,
    delete: admins,
  },
  hooks: {
    beforeChange: [promoteFirstUserToAdmin],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      maxLength: 120,
      admin: {
        description: 'Display name used to identify this CMS user.',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        {
          label: 'Administrator',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      access: {
        update: ({ req }) =>
          Boolean(
            req.user &&
              typeof req.user === 'object' &&
              'role' in req.user &&
              req.user.role === 'admin',
          ),
      },
      admin: {
        position: 'sidebar',
        description: 'Administrators can manage team members. Editors manage site content.',
      },
    },
  ],
}
