import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const allowedPreviewPath = (path: string) => {
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('://')) return false

  return (
    path === '/services' ||
    path.startsWith('/services#') ||
    path.startsWith('/journal/') ||
    path.startsWith('/portfolio/')
  )
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret') || ''
  const path = url.searchParams.get('path') || ''
  const expectedSecret = process.env.PREVIEW_SECRET || ''

  if (!expectedSecret || secret !== expectedSecret || !allowedPreviewPath(path)) {
    return new Response('Invalid preview request.', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
