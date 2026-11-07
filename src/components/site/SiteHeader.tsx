'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { Navigation, SiteSetting } from '@/payload-types'
import { LinkButton } from '@/components/ui/LinkButton'

import styles from './SiteHeader.module.css'

type SiteHeaderProps = {
  navigation: Navigation | null
  siteSettings: SiteSetting | null
}

const fallbackLinks = [
  { label: 'Portfolio', url: '/portfolio' },
  { label: 'Services', url: '/services' },
  { label: 'About', url: '/about' },
  { label: 'Journal', url: '/journal' },
  { label: 'Contact', url: '/contact' },
]

const isExternal = (url: string) => /^https?:\/\//i.test(url)

const isActivePath = (pathname: string, url: string) => {
  if (isExternal(url)) return false
  if (url === '/') return pathname === '/'

  return pathname === url || pathname.startsWith(url + '/')
}

function NavLink({
  active = false,
  label,
  newTab,
  url,
}: {
  active?: boolean
  label: string
  newTab?: boolean | null
  url: string
}) {
  const content = <span>{label}</span>

  if (isExternal(url) || newTab) {
    return (
      <a href={url} rel={newTab ? 'noreferrer' : undefined} target={newTab ? '_blank' : undefined}>
        {content}
      </a>
    )
  }

  return (
    <Link aria-current={active ? 'page' : undefined} href={url}>
      {content}
    </Link>
  )
}

export function SiteHeader({ navigation, siteSettings }: SiteHeaderProps) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDetailsElement>(null)
  const [menuState, setMenuState] = useState({ open: false, pathname })
  const [scrolled, setScrolled] = useState(false)
  const menuOpen = menuState.pathname === pathname && menuState.open

  const links = navigation?.headerLinks?.length ? navigation.headerLinks : fallbackLinks
  const brand = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const brandTagline = siteSettings?.tagline || 'Makeup Artistry'
  const ctaLabel = navigation?.primaryCTA?.label || 'Check availability'
  const ctaURL = navigation?.primaryCTA?.url || '/contact'
  const mobileDescription =
    siteSettings?.shortDescription ||
    'Refined makeup for weddings, editorial work, portraits and modern occasions.'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    if (main instanceof HTMLElement) main.inert = menuOpen
    if (footer instanceof HTMLElement) footer.inert = menuOpen

    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      const menu = menuRef.current
      if (!menu) return

      menu.open = false
      setMenuState({ open: false, pathname })
      menu.querySelector('summary')?.focus()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (main instanceof HTMLElement) main.inert = false
      if (footer instanceof HTMLElement) footer.inert = false
    }
  }, [menuOpen, pathname])

  return (
    <header className={styles.header} data-scrolled={scrolled ? 'true' : 'false'}>
      <div className={styles.inner}>
        <Link aria-label={brand + ' home'} className={styles.brand} href="/">
          <span>{brand}</span>
          <small>{brandTagline}</small>
        </Link>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {links.map((link) => (
            <NavLink
              active={isActivePath(pathname, link.url)}
              key={link.label + '-' + link.url}
              {...link}
            />
          ))}
        </nav>

        <div className={styles.desktopCTA}>
          <LinkButton href={ctaURL} variant="text">
            {ctaLabel}
          </LinkButton>
        </div>

        <details
          className={styles.mobileNav}
          key={pathname}
          onToggle={(event) => setMenuState({ open: event.currentTarget.open, pathname })}
          ref={menuRef}
        >
          <summary aria-expanded={menuOpen} aria-label="Navigation menu">
            <span className={styles.menuClosedLabel}>Menu</span>
            <span className={styles.menuOpenLabel}>Close</span>
            <span aria-hidden="true" className={styles.menuMark}>
              <i />
              <i />
            </span>
          </summary>

          <div className={styles.mobilePanel}>
            <div className={styles.mobileTopline}>
              <span>Navigation</span>
              <span>{brand}</span>
            </div>

            <nav aria-label="Mobile navigation">
              {links.map((link) => (
                <NavLink
                  active={isActivePath(pathname, link.url)}
                  key={link.label + '-' + link.url}
                  {...link}
                />
              ))}
            </nav>

            <div className={styles.mobileBottom}>
              <p>{mobileDescription}</p>
              <LinkButton className={styles.mobileCTA} href={ctaURL} variant="outline">
                {ctaLabel}
              </LinkButton>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}