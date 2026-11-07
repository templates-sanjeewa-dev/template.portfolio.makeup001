import { LinkButton } from '@/components/ui/LinkButton'

import styles from './EditorialCTA.module.css'

type EditorialCTAProps = {
  body: string
  eyebrow: string
  href: string
  label: string
  title: string
}

export function EditorialCTA({ body, eyebrow, href, label, title }: EditorialCTAProps) {
  return (
    <section className={styles.cta}>
      <p className={styles.index}>{eyebrow}</p>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{body}</p>
        <LinkButton href={href}>{label}</LinkButton>
      </div>
    </section>
  )
}
