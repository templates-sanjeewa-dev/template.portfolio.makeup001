type PreviewDocument = Record<string, unknown>

const slugFrom = (doc: PreviewDocument) =>
  typeof doc.slug === 'string' && doc.slug.trim() ? doc.slug.trim() : null

const previewURL = (path: string) => {
  const secret = process.env.PREVIEW_SECRET

  if (!secret) return null

  const params = new URLSearchParams({
    path,
    secret,
  })

  return '/preview?' + params.toString()
}

export const journalPreviewURL = (doc: PreviewDocument) => {
  const slug = slugFrom(doc)
  return slug ? previewURL('/journal/' + slug) : null
}

export const portfolioPreviewURL = (doc: PreviewDocument) => {
  const slug = slugFrom(doc)
  return slug ? previewURL('/portfolio/' + slug) : null
}

export const servicePreviewURL = (doc: PreviewDocument) => {
  const slug = slugFrom(doc)
  return slug ? previewURL('/services#' + slug) : null
}
