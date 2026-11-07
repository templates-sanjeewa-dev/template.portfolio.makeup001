export const makeWhatsAppURL = (phone: string | null | undefined, message?: string) => {
  if (!phone) return null

  const digits = phone.replace(/\D/g, '')

  if (digits.length < 7) return null

  const query = message ? '?text=' + encodeURIComponent(message) : ''

  return 'https://wa.me/' + digits + query
}

export const makeTelURL = (phone: string | null | undefined) => {
  if (!phone) return null

  const cleaned = phone.replace(/[^+\d]/g, '')

  return cleaned ? 'tel:' + cleaned : null
}
