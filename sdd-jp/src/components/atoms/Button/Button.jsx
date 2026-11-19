import clsx from 'clsx'
import styles from './Button.module.css'

function Button({ variant = 'primary', size = 'md', full = false, className, as: Tag = 'button', ...props }) {
  return (
    <Tag
      className={clsx(styles.button, styles[variant], styles[size], full && styles.full, className)}
      {...props}
    />
  )
}

export default Button
