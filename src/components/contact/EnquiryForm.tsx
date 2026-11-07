'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import type { Service } from '@/payload-types'
import {
  submitEnquiry,
  type EnquiryFormState,
} from '@/app/(frontend)/contact/actions'

import styles from './EnquiryForm.module.css'

type EnquiryFormProps = {
  initialServiceSlug?: string
  services: Service[]
  successMessage: string
}

const initialState: EnquiryFormState = {}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className={styles.submit} disabled={pending} type="submit">
      <span>{pending ? 'Sending enquiry…' : 'Request availability'}</span>
      <span aria-hidden="true">↗</span>
    </button>
  )
}

export function EnquiryForm({
  initialServiceSlug,
  services,
  successMessage,
}: EnquiryFormProps) {
  const [state, formAction] = useActionState(submitEnquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  if (state.success) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successLabel}>Enquiry received</p>
        <h2>Thank you.</h2>
        <p>{successMessage}</p>
        <div className={styles.successNext}>
          <span>What happens now</span>
          <p>
            The details are reviewed personally. If the date and scope align, you’ll receive a
            reply with availability and the next practical steps.
          </p>
        </div>
        <a href="/contact">Send another enquiry</a>
      </div>
    )
  }

  const errorFor = (field: keyof NonNullable<EnquiryFormState['fieldErrors']>) =>
    state.fieldErrors?.[field]

  return (
    <form action={formAction} className={styles.form} noValidate ref={formRef}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>
          <span>01</span>
          <strong>What are you planning?</strong>
          <small>Choose the closest service, or “Not sure yet.”</small>
        </legend>

        <div
          aria-describedby={errorFor('service') ? 'service-error' : undefined}
          className={styles.serviceChoices}
        >
          <label className={styles.serviceChoice}>
            <input
              defaultChecked={!initialServiceSlug}
              name="service"
              type="radio"
              value=""
            />
            <span className={styles.choiceContent}>
              <strong>Not sure yet</strong>
              <small>Start with the date and occasion.</small>
            </span>
            <span aria-hidden="true">○</span>
          </label>

          {services.map((service) => (
            <label className={styles.serviceChoice} key={service.id}>
              <input
                defaultChecked={initialServiceSlug === service.slug}
                name="service"
                type="radio"
                value={service.slug}
              />
              <span className={styles.choiceContent}>
                <strong>{service.title}</strong>
                <span className={styles.choiceMeta}>
                  {service.durationLabel && <span>{service.durationLabel}</span>}
                  {service.priceLabel && <span>{service.priceLabel}</span>}
                </span>
              </span>
              <span aria-hidden="true">○</span>
            </label>
          ))}
        </div>

        {errorFor('service') && (
          <p className={styles.error} id="service-error">
            {errorFor('service')}
          </p>
        )}
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>
          <span>02</span>
          <strong>Date and place.</strong>
          <small>Estimates are completely fine.</small>
        </legend>

        <div className={styles.twoColumn}>
          <div className={styles.field}>
            <label htmlFor="eventDate">Event date</label>
            <input
              aria-describedby={errorFor('eventDate') ? 'event-date-error' : undefined}
              aria-invalid={Boolean(errorFor('eventDate'))}
              id="eventDate"
              name="eventDate"
              type="date"
            />
            {errorFor('eventDate') && (
              <p className={styles.error} id="event-date-error">
                {errorFor('eventDate')}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="peopleCount">Number of people</label>
            <input
              aria-describedby={errorFor('peopleCount') ? 'people-count-error' : undefined}
              aria-invalid={Boolean(errorFor('peopleCount'))}
              id="peopleCount"
              max={100}
              min={1}
              name="peopleCount"
              placeholder="e.g. 1 or 5"
              type="number"
            />
            {errorFor('peopleCount') && (
              <p className={styles.error} id="people-count-error">
                {errorFor('peopleCount')}
              </p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="location">Location / venue</label>
          <input
            aria-describedby={errorFor('location') ? 'location-error' : undefined}
            aria-invalid={Boolean(errorFor('location'))}
            autoComplete="street-address"
            id="location"
            maxLength={180}
            name="location"
            placeholder="Venue, city, or approximate area"
            type="text"
          />
          {errorFor('location') && (
            <p className={styles.error} id="location-error">
              {errorFor('location')}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>
          <span>03</span>
          <strong>Your details and note.</strong>
          <small>Tell me how to reply and anything useful about the day.</small>
        </legend>

        <div className={styles.twoColumn}>
          <div className={styles.field}>
            <label htmlFor="name">Your name *</label>
            <input
              aria-describedby={errorFor('name') ? 'name-error' : undefined}
              aria-invalid={Boolean(errorFor('name'))}
              autoComplete="name"
              id="name"
              maxLength={120}
              name="name"
              required
              type="text"
            />
            {errorFor('name') && (
              <p className={styles.error} id="name-error">
                {errorFor('name')}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email *</label>
            <input
              aria-describedby={errorFor('email') ? 'email-error' : undefined}
              aria-invalid={Boolean(errorFor('email'))}
              autoComplete="email"
              id="email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
            {errorFor('email') && (
              <p className={styles.error} id="email-error">
                {errorFor('email')}
              </p>
            )}
          </div>
        </div>

        <div className={styles.twoColumn}>
          <div className={styles.field}>
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input
              aria-describedby={errorFor('phone') ? 'phone-error' : undefined}
              aria-invalid={Boolean(errorFor('phone'))}
              autoComplete="tel"
              id="phone"
              maxLength={50}
              name="phone"
              type="tel"
            />
            {errorFor('phone') && (
              <p className={styles.error} id="phone-error">
                {errorFor('phone')}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="preferredContact">Preferred contact *</label>
            <select
              aria-describedby={
                errorFor('preferredContact') ? 'preferred-contact-error' : undefined
              }
              aria-invalid={Boolean(errorFor('preferredContact'))}
              defaultValue="email"
              id="preferredContact"
              name="preferredContact"
              required
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone</option>
            </select>
            {errorFor('preferredContact') && (
              <p className={styles.error} id="preferred-contact-error">
                {errorFor('preferredContact')}
              </p>
            )}
          </div>
        </div>
        <div className={styles.noteField}>
          <div className={styles.noteIntro}>
            <span>Brief note</span>
            <small>No polished brief needed—just enough context to understand the occasion.</small>
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Your note *</label>
            <textarea
              aria-describedby={errorFor('message') ? 'message-error' : 'message-help'}
              aria-invalid={Boolean(errorFor('message'))}
              id="message"
              maxLength={3000}
              name="message"
              placeholder="For example: ready-by time, the level of makeup you prefer, a Portfolio look you liked, dress or styling direction, or anything important about the day."
              required
              rows={7}
            />
            {errorFor('message') ? (
              <p className={styles.error} id="message-error">
                {errorFor('message')}
              </p>
            ) : (
              <p className={styles.help} id="message-help">
                References can be discussed after availability is confirmed. A simple description is
                enough for the first message.
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {state.formError && (
        <p className={styles.formError} role="alert">
          {state.formError}
        </p>
      )}

      <div className={styles.formFooter}>
        <div>
          <strong>Availability request only.</strong>
          <p>
            Sending this form does not confirm a booking or payment. Final scope, timing, pricing,
            and next steps are confirmed personally.
          </p>
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}
