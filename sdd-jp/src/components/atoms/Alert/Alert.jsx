import clsx from 'clsx'
import styles from './Alert.module.css'

function Alert({ tone = 'info', title, children, action, className, ...props }) {
  return (
    <div className={clsx(styles.alert, styles[tone], className)} role="alert" {...props}>
      <div>
        {title && <strong className={styles.title}>{title}</strong>}
        {children && <div className={styles.body}>{children}</div>}
      </div>
      {action}
    </div>
  )
}

export default Alert
