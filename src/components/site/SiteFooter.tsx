import Link from 'next/link'

import type { Navigation, SiteSetting } from '@/payload-types'
import { LinkButton } from '@/components/ui/LinkButton'

import styles from './SiteFooter.module.css'

type SiteFooterProps = {
  navigation: Navigation | null
  siteSettings: SiteSetting | null
}

const fallbackLinks = [
  { label: 'Portfolio', url: '/portfolio', newTab: false },
  { label: 'Services', url: '/services', newTab: false },
  { label: 'About', url: '/about', newTab: false },
  { label: 'Journal', url: '/journal', newTab: false },
  { label: 'Contact', url: '/contact', newTab: false },
]

const isExternal = (url: string) => /^https?:\/\//i.test(url)

export function SiteFooter({ navigation, siteSettings }: SiteFooterProps) {
  const brand = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const links = navigation?.footerLinks?.length ? navigation.footerLinks : fallbackLinks
  const email = siteSettings?.contact?.email
  const area = siteSettings?.contact?.serviceArea
  const socialLinks = siteSettings?.socialLinks ?? []
  const tagline = siteSettings?.tagline
  const description = siteSettings?.shortDescription
  const ctaLabel = navigation?.primaryCTA?.label || 'Start an enquiry'
  const ctaURL = navigation?.primaryCTA?.url || '/contact'

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <p className={styles.kicker}>{tagline || 'Makeup artistry'}</p>
            <p className={styles.brand}>{brand}</p>
            {area && <p className={styles.area}>{area}</p>}
          </div>

          <div className={styles.invitation}>
            <p>
              {description ||
                'For weddings, editorials, portraits, and beautifully considered occasions.'}
            </p>
            <LinkButton href={ctaURL} variant="outline">
              {ctaLabel}
            </LinkButton>
          </div>
        </div>

        <div className={styles.grid} data-columns={socialLinks.length ? 'three' : 'two'}>
          <nav aria-label="Footer navigation">
            <p className={styles.label}>Explore</p>
            {links.map((link) =>
              isExternal(link.url) || link.newTab ? (
                <a
                  href={link.url}
                  key={link.label + '-' + link.url}
                  rel={link.newTab ? 'noreferrer' : undefined}
                  target={link.newTab ? '_blank' : undefined}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.url} key={link.label + '-' + link.url}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div>
            <p className={styles.label}>Contact</p>
            {email && <a href={'mailto:' + email}>{email}</a>}
            {area && <p>{area}</p>}
            {!email && !area && <p>Available by enquiry</p>}
          </div>

          {socialLinks.length ? (
            <div>
              <p className={styles.label}>Follow</p>
              {socialLinks.map((social) => (
                <a
                  href={social.url}
                  key={social.platform + '-' + social.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {social.label || social.platform}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {brand}
          </p>
          <p>
            {navigation?.footerNote ||
              tagline ||
              'Artistry with a quiet, editorial point of view.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
