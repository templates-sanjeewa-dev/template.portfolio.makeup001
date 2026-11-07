import styles from './loading.module.css'

export default function FrontendLoading() {
  return (
    <div aria-label="Loading page" aria-live="polite" className={styles.loading} role="status">
      <div className={styles.topline}>
        <span>Studio / Loading</span>
        <span>Preparing the next page</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.image} />
        <div className={styles.copy}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span />
      </div>
    </div>
  )
}
