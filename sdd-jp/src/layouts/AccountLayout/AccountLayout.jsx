import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './AccountLayout.module.css'

const LINKS = [
  { rotulo: 'Visão geral', para: '/minha-conta', end: true },
  { rotulo: 'Minhas reservas', para: '/minha-conta/reservas' },
  { rotulo: 'Meu perfil', para: '/minha-conta/perfil' },
  { rotulo: 'Pagamentos', para: '/minha-conta/reservas' },
  { rotulo: 'Avaliações', para: '/avaliacoes' },
]

function AccountLayout() {
  const { usuario, sair } = useAuth()
  const navigate = useNavigate()

  function encerrar() {
    sair()
    navigate('/')
  }

  return (
    <div className={`container ${styles.grid}`}>
      <aside className={styles.sidebar}>
        <p className={styles.eyebrow}>Área do cliente</p>
        <p className={styles.nome}>{usuario?.nome}</p>
        <nav aria-label="Navegação da conta" className={styles.nav}>
          {LINKS.map((link) => (
            <NavLink
              key={link.rotulo}
              to={link.para}
              end={link.end}
              className={({ isActive }) => (isActive ? styles.ativo : undefined)}
            >
              {link.rotulo}
            </NavLink>
          ))}
          <button type="button" onClick={encerrar}>
            Sair
          </button>
        </nav>
      </aside>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AccountLayout
