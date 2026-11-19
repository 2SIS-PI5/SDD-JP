import clsx from 'clsx'
import styles from './FormField.module.css'

function FormField({ id, label, error, hint, as: Tag = 'input', className, children, ...props }) {
  const errorId = error ? `${id}-erro` : undefined
  const hintId = hint ? `${id}-ajuda` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={clsx(styles.field, className)}>
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        className={styles.control}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </Tag>
      {hint && (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
