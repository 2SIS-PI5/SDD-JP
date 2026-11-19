import styles from './Rating.module.css'

function Rating({ nota = 0, total, compact = false }) {
  const estrelas = Math.round(Number(nota) || 0)
  return (
    <span className={styles.rating} aria-label={`Nota ${Number(nota).toFixed(1)} de 5`}>
      <span className={styles.stars} aria-hidden="true">
        {'★'.repeat(Math.max(0, estrelas))}
        <span className={styles.emptyStars}>{'★'.repeat(Math.max(0, 5 - estrelas))}</span>
      </span>
      {!compact && <span className={styles.value}>{Number(nota).toFixed(1)}</span>}
      {typeof total === 'number' && <span className={styles.total}>({total})</span>}
    </span>
  )
}

export default Rating
