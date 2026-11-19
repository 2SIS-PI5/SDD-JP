import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/molecules/Header/Header.jsx'
import Footer from '../components/molecules/Footer/Footer.jsx'
import styles from './PublicLayout.module.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#conteudo">
        Ir para o conteúdo principal
      </a>
      <ScrollToTop />
      <Header />
      <main id="conteudo" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
