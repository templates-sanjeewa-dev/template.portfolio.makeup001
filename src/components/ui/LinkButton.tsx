import Link from 'next/link'
import type { ReactNode } from 'react'

import styles from './LinkButton.module.css'

type LinkButtonProps = {
  children: ReactNode
  className?: string
  href: string
  variant?: 'solid' | 'outline' | 'text'
}

const isExternal = (href: string) => /^https?:\/\//i.test(href)

export function LinkButton({
  children,
  className = '',
  href,
  variant = 'solid',
}: LinkButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className={styles.arrow}>
        ↗
      </span>
    </>
  )

  if (isExternal(href)) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        {content}
      </a>
    )
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  )
}
