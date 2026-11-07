'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Media } from '@/payload-types'

import styles from './CmsImage.module.css'

type CmsImageProps = {
  className?: string
  image: Media | number | null | undefined
  priority?: boolean
  sizes?: string
}

export function CmsImage({
  className,
  image,
  priority = false,
  sizes = '100vw',
}: CmsImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failedURL, setFailedURL] = useState<string | null>(null)

  if (!image || typeof image === 'number' || !image.url) return null

  const classes = [styles.image, loaded ? styles.loaded : '', className].filter(Boolean).join(' ')

  // A remote demo image may disappear after launch; never expose a broken
  // image icon or the raw alt text inside an editorial photography frame.
  if (failedURL === image.url) {
    return <span aria-label={image.alt} className={styles.fallback} role="img" />
  }

  return (
    <Image
      alt={image.alt}
      className={classes}
      data-loaded={loaded ? 'true' : 'false'}
      fill
      onError={() => setFailedURL(image.url!)}
      onLoad={() => setLoaded(true)}
      priority={priority}
      sizes={sizes}
      src={image.url}
    />
  )
}
