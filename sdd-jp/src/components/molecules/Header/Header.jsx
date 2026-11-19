import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../../atoms/Button/Button.jsx'
import { useAuth } from '../../../hooks/useAuth.js'
import UserMenu from '../UserMenu/UserMenu.jsx'
import styles from './Header.module.css'

const LINKS = [
  { rotulo: 'Início', para: '/' },
  { rotulo: 'Acomodações', para: '/acomodacoes' },
  { rotulo: 'Experiências', para: '/#experiencias' },
  { rotulo: 'Sobre', para: '/sobre' },
  { rotulo: 'Contato', para: '/contato' },
]

function Header() {
  const { autenticado } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)

  const fechar = () => setMenuAberto(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={fechar} aria-label="Hotel Sereno — página inicial">
          <span className={styles.mark} aria-hidden="true">
            HS
          </span>
          <span>
            <strong>Hotel Sereno</strong>
            <small>Hospedagem contemporânea</small>
          </span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto((valor) => !valor)}
        >
          <span aria-hidden="true">{menuAberto ? '✕' : '☰'}</span>
          <span className="sr-only">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>

        <nav
          id="menu-principal"
          className={`${styles.nav} ${menuAberto ? styles.navAberta : ''}`}
          aria-label="Navegação principal"
        >
          <div className={styles.links}>
            {LINKS.map((link) =>
              link.para.includes('#') ? (
                <a key={link.rotulo} href={link.para} onClick={fechar}>
                  {link.rotulo}
                </a>
              ) : (
                <NavLink
                  key={link.rotulo}
                  to={link.para}
                  end={link.para === '/'}
                  onClick={fechar}
                  className={({ isActive }) => (isActive ? styles.ativo : undefined)}
                >
                  {link.rotulo}
                </NavLink>
              ),
            )}
          </div>

          <div className={styles.acoes}>
            {autenticado ? (
              <UserMenu />
            ) : (
              <>
                <Button as={Link} to="/login" variant="ghost" size="sm" onClick={fechar}>
                  Entrar
                </Button>
                <Button as={Link} to="/cadastro" variant="primary" size="sm" onClick={fechar}>
                  Criar conta
                </Button>
              </>
            )}
            <Button as={Link} to="/buscar" variant="secondary" size="sm" onClick={fechar}>
              Reservar
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
