import { Link, Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

function AuthLayout() {
  return (
    <div className={styles.shell}>
      <aside className={styles.aside} aria-hidden="true">
        <div className={styles.asideContent}>
          <Link to="/" className={styles.brand}>
            Hotel Sereno
          </Link>
          <p className={styles.quote}>
            “Hospitalidade é lembrar que cada detalhe pode transformar uma estadia em memória.”
          </p>
          <p className={styles.note}>Hospedagem contemporânea · São Paulo</p>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.top}>
          <Link to="/" className={styles.back}>
            ← Voltar ao site
          </Link>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
