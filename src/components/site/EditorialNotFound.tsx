import Link from 'next/link'

import styles from './EditorialNotFound.module.css'

type EditorialNotFoundProps = {
  eyebrow: string
  message: string
  returnHref: string
  returnLabel: string
  title: string
}

export function EditorialNotFound({
  eyebrow,
  message,
  returnHref,
  returnLabel,
  title,
}: EditorialNotFoundProps) {
  return (
    <section className={styles.page}>
      <div className={styles.index}>
        <span>404</span>
        <span>{eyebrow}</span>
      </div>

      <div className={styles.content}>
        <p>Page unavailable</p>
        <h1>{title}</h1>
        <div className={styles.bottom}>
          <p>{message}</p>
          <Link href={returnHref}>{returnLabel} ↗</Link>
        </div>
      </div>
    </section>
  )
}
