'use client'

import { useEffect, useRef, useState } from 'react'

import { CmsImage } from '@/components/media/CmsImage'
import type { Media, PortfolioProject } from '@/payload-types'

import styles from './ProjectGallery.module.css'

type GalleryItem = NonNullable<PortfolioProject['gallery']>[number]

type ProjectGalleryProps = {
  gallery: PortfolioProject['gallery']
}

const mediaFrom = (value: GalleryItem['image']): Media | null =>
  value && typeof value === 'object' && 'url' in value ? value : null

const layoutClass = (item: GalleryItem, index: number) => {
  if (item.presentation === 'wide') return styles.wide
  if (item.presentation === 'portrait') return styles.portrait
  if (item.presentation === 'landscape') return styles.landscape

  const pattern = index % 6

  if (pattern === 0 || pattern === 5) return styles.wide
  if (pattern === 1 || pattern === 3) return styles.portrait

  return styles.landscape
}

export function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const items =
    gallery
      ?.map((item) => ({ image: mediaFrom(item.image), item }))
      .filter((entry): entry is { image: Media; item: GalleryItem } => Boolean(entry.image)) ?? []

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal()
    }

    if (activeIndex === null && dialog.open) {
      dialog.close()
    }
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex])

  if (!items.length) return null

  const activeEntry = activeIndex === null ? null : items[activeIndex]

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null) return 0
      return (current + direction + items.length) % items.length
    })
  }

  return (
    <>
      <div className={styles.gallery}>
        {items.map(({ image, item }, index) => (
          <figure
            className={styles.figure + ' ' + layoutClass(item, index)}
            key={item.id || String(index)}
          >
            <button
              aria-label={'View larger: ' + (item.caption || image.alt)}
              className={styles.imageButton}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span className={styles.imageFrame}>
                <CmsImage
                  image={image}
                  sizes={
                    item.presentation === 'wide' || index % 6 === 0
                      ? '(max-width: 760px) 100vw, 90vw'
                      : '(max-width: 760px) 100vw, 48vw'
                  }
                />
                <span className={styles.viewCue} aria-hidden="true">
                  View larger
                </span>
              </span>
            </button>

            <figcaption>
              <span>{item.caption || image.alt}</span>
              {image.credit && <span>{image.credit}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        aria-label="Project image viewer"
        className={styles.lightbox}
        onClose={() => setActiveIndex(null)}
        onKeyDown={(event) => {
          if (items.length < 2) return
          if (event.key === 'ArrowLeft') move(-1)
          if (event.key === 'ArrowRight') move(1)
        }}
        ref={dialogRef}
      >
        {activeEntry && (
          <div className={styles.lightboxInner}>
            <button
              aria-label="Close image viewer"
              className={styles.lightboxClose}
              onClick={() => dialogRef.current?.close()}
              type="button"
            >
              Close <span aria-hidden="true">×</span>
            </button>

            <div className={styles.lightboxStage}>
              <div className={styles.lightboxImage}>
                <CmsImage
                  image={activeEntry.image}
                  sizes="(max-width: 760px) 96vw, 82vw"
                />
              </div>
            </div>

            <div className={styles.lightboxFooter}>
              <div>
                <span>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <p>{activeEntry.item.caption || activeEntry.image.alt}</p>
                {activeEntry.image.credit && <small>{activeEntry.image.credit}</small>}
              </div>

              {items.length > 1 && (
                <div className={styles.lightboxNav}>
                  <button aria-label="Previous image" onClick={() => move(-1)} type="button">
                    ←
                  </button>
                  <button aria-label="Next image" onClick={() => move(1)} type="button">
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
