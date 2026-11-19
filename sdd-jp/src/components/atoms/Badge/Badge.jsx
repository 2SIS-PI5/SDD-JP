import clsx from 'clsx'
import styles from './Badge.module.css'

function Badge({ tone = 'neutral', children, className }) {
  return <span className={clsx(styles.badge, styles[tone], className)}>{children}</span>
}

export default Badge
