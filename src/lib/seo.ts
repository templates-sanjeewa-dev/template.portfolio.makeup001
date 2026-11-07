export const getSiteURL = () => {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim()
  const withProtocol = /^https?:\/\//i.test(configured) ? configured : 'https://' + configured

  return withProtocol.replace(/\/$/, '')
}

export const absoluteURL = (value: string | null | undefined) => {
  if (!value) return undefined
  if (/^https?:\/\//i.test(value)) return value

  return getSiteURL() + (value.startsWith('/') ? value : '/' + value)
}
