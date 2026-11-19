import styles from './Spinner.module.css'

function Spinner({ label = 'Carregando', size = 'md' }) {
  return (
    <span className={styles.wrapper} role="status" aria-live="polite">
      <span className={`${styles.spinner} ${styles[size]}`} aria-hidden="true" />
      <span className={label ? styles.label : 'sr-only'}>{label}</span>
    </span>
  )
}

export default Spinner
