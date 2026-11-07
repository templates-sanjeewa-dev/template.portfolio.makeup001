import styles from './loading.module.css'

export default function PortfolioLoading() {
  return (
    <div aria-label="Loading portfolio" className={styles.loading} role="status">
      <div className={styles.heading}>
        <span />
        <span />
      </div>
      <div className={styles.grid}>
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
