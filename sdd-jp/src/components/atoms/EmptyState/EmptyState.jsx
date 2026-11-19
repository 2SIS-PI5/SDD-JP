import styles from './EmptyState.module.css'

function EmptyState({ icon = '◇', title, description, action }) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}

export default EmptyState
