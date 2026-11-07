'use server'

import { getPayload } from 'payload'

import config from '@/payload.config'

export type EnquiryFieldErrors = Partial<
  Record<
    | 'email'
    | 'eventDate'
    | 'location'
    | 'message'
    | 'name'
    | 'peopleCount'
    | 'phone'
    | 'preferredContact'
    | 'service',
    string
  >
>

export type EnquiryFormState = {
  fieldErrors?: EnquiryFieldErrors
  formError?: string
  success?: boolean
}

const clean = (value: FormDataEntryValue | null, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitEnquiry(
  _previousState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const honeypot = clean(formData.get('website'), 200)

  // Quietly accept bot submissions without storing them.
  if (honeypot) {
    return { success: true }
  }

  const name = clean(formData.get('name'), 120)
  const email = clean(formData.get('email'), 254).toLowerCase()
  const phone = clean(formData.get('phone'), 50)
  const preferredContact = clean(formData.get('preferredContact'), 20)
  const serviceSlug = clean(formData.get('service'), 140)
  const eventDate = clean(formData.get('eventDate'), 20)
  const location = clean(formData.get('location'), 180)
  const peopleCountRaw = clean(formData.get('peopleCount'), 6)
  const message = clean(formData.get('message'), 3000)

  const fieldErrors: EnquiryFieldErrors = {}

  if (name.length < 2) {
    fieldErrors.name = 'Please enter your name.'
  }

  if (!emailPattern.test(email)) {
    fieldErrors.email = 'Enter a valid email address.'
  }

  if (phone && phone.length < 7) {
    fieldErrors.phone = 'Enter a valid phone or WhatsApp number.'
  }

  if (!['email', 'phone', 'whatsapp'].includes(preferredContact)) {
    fieldErrors.preferredContact = 'Choose how you would like to be contacted.'
  }

  if ((preferredContact === 'phone' || preferredContact === 'whatsapp') && !phone) {
    fieldErrors.phone = 'Add a phone number for your selected contact method.'
  }

  if (eventDate) {
    const matchesDateShape = /^\d{4}-\d{2}-\d{2}$/.test(eventDate)
    const parsedDate = matchesDateShape ? new Date(eventDate + 'T12:00:00Z') : null
    const isExactDate =
      parsedDate &&
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === eventDate

    if (!isExactDate) {
      fieldErrors.eventDate = 'Choose a valid event date.'
    }
  }

  if (location.length > 180) {
    fieldErrors.location = 'Location is too long.'
  }

  let peopleCount: number | undefined

  if (peopleCountRaw) {
    peopleCount = Number(peopleCountRaw)
    if (!Number.isInteger(peopleCount) || peopleCount < 1 || peopleCount > 100) {
      fieldErrors.peopleCount = 'Enter a number between 1 and 100.'
    }
  }

  if (message.length < 15) {
    fieldErrors.message = 'Tell us a little more about the occasion.'
  }

  if (Object.keys(fieldErrors).length) {
    return {
      fieldErrors,
      formError: 'Please review the highlighted fields.',
    }
  }

  try {
    const payload = await getPayload({ config })

    let serviceID: number | undefined

    if (serviceSlug) {
      const serviceResult = await payload.find({
        collection: 'services',
        depth: 0,
        limit: 1,
        overrideAccess: false,
        where: {
          slug: {
            equals: serviceSlug,
          },
        },
      })

      const service = serviceResult.docs[0]

      if (!service) {
        return {
          fieldErrors: {
            service: 'That service is no longer available. Please choose another option.',
          },
          formError: 'Please review the selected service.',
        }
      }

      serviceID = service.id
    }

    await payload.create({
      collection: 'enquiries',
      data: {
        email,
        eventDate: eventDate || undefined,
        location: location || undefined,
        message,
        name,
        peopleCount,
        phone: phone || undefined,
        preferredContact: preferredContact as 'email' | 'phone' | 'whatsapp',
        service: serviceID,
        source: 'website',
        status: 'new',
      },
      overrideAccess: true,
    })

    return {
      success: true,
    }
  } catch {
    return {
      formError:
        'Your enquiry could not be sent right now. Please try again or use the direct contact options.',
    }
  }
}
