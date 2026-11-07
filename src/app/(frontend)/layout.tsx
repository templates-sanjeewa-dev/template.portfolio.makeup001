import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import React from 'react'

import { MotionFrame } from '@/components/motion/MotionFrame'
import { PreviewBanner } from '@/components/site/PreviewBanner'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { absoluteURL, getSiteURL } from '@/lib/seo'
import { getShellData } from '@/lib/site-data'
import type { Media } from '@/payload-types'

import './styles.css'

const displayFont = Cormorant_Garamond({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const sansFont = Manrope({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getShellData()
  const defaultSEO = siteSettings?.defaultSEO
  const siteName = siteSettings?.siteName || siteSettings?.artistName || 'Makeup Artist Portfolio'
  const socialImage =
    defaultSEO?.image && typeof defaultSEO.image === 'object' && 'url' in defaultSEO.image
      ? (defaultSEO.image as Media)
      : null
  const description =
    defaultSEO?.description ||
    siteSettings?.shortDescription ||
    'Editorial makeup artistry for weddings, portraits, campaigns, and modern occasions.'

  return {
    metadataBase: new URL(getSiteURL()),
    description,
    openGraph: {
      description,
      images: socialImage?.url
        ? [{ alt: socialImage.alt, url: absoluteURL(socialImage.url) || socialImage.url }]
        : undefined,
      siteName,
      title: defaultSEO?.title || siteName,
      type: 'website',
    },
    robots: defaultSEO?.noIndex ? { index: false, follow: false } : undefined,
    title: {
      default: defaultSEO?.title || siteName,
      template: '%s — ' + siteName,
    },
    twitter: {
      card: socialImage?.url ? 'summary_large_image' : 'summary',
      description,
      images: socialImage?.url ? [absoluteURL(socialImage.url) || socialImage.url] : undefined,
      title: defaultSEO?.title || siteName,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ navigation, siteSettings }, preview] = await Promise.all([
    getShellData(),
    draftMode(),
  ])

  const artistName = siteSettings?.artistName || siteSettings?.siteName || 'Makeup Artist'
  const siteName = siteSettings?.siteName || artistName
  const siteURL = getSiteURL()
  const profileLinks = (siteSettings?.socialLinks ?? []).map((item) => item.url)

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteURL,
  }

  const artistJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artistName,
    description: siteSettings?.shortDescription || siteSettings?.tagline || undefined,
    email: siteSettings?.contact?.email || undefined,
    sameAs: profileLinks.length ? profileLinks : undefined,
    url: siteURL + '/about',
    workLocation: siteSettings?.contact?.serviceArea
      ? {
          '@type': 'Place',
          name: siteSettings.contact.serviceArea,
        }
      : undefined,
  }

  return (
    <html className={displayFont.variable + ' ' + sansFont.variable} lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd, artistJsonLd]).replace(/</g, '\\u003c'),
          }}
          type="application/ld+json"
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-frame">
          {preview.isEnabled && <PreviewBanner />}
          <SiteHeader navigation={navigation} siteSettings={siteSettings} />
          <main id="main-content">
            <MotionFrame>{children}</MotionFrame>
          </main>
          <SiteFooter navigation={navigation} siteSettings={siteSettings} />
        </div>
      </body>
    </html>
  )
}
