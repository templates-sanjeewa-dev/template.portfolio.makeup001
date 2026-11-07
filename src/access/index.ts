import type { Access } from 'payload'

type UserWithRole = {
  id?: number | string
  role?: 'admin' | 'editor' | null
}

const asUserWithRole = (user: unknown): UserWithRole | null => {
  if (!user || typeof user !== 'object') return null
  return user as UserWithRole
}

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const admins: Access = ({ req }) => asUserWithRole(req.user)?.role === 'admin'

export const authenticatedOrPublished: Access = ({ req }) => {
  if (req.user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const adminsOrSelf: Access = ({ req }) => {
  const user = asUserWithRole(req.user)

  if (!user?.id) return false
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const createFirstUserOrAdmin: Access = async ({ req }) => {
  if (asUserWithRole(req.user)?.role === 'admin') return true

  const existingUsers = await req.payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  return existingUsers.totalDocs === 0
}
