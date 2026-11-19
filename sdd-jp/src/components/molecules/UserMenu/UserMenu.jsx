import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.js'
import styles from './UserMenu.module.css'

function iniciais(nome = '') {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase()
}

function UserMenu() {
  const { usuario, sair } = useAuth()
  const [aberto, setAberto] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!aberto) return
    function aoClicar(evento) {
      if (!containerRef.current?.contains(evento.target)) setAberto(false)
    }
    function aoTeclar(evento) {
      if (evento.key === 'Escape') setAberto(false)
    }
    document.addEventListener('mousedown', aoClicar)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicar)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto])

  if (!usuario) return null

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={aberto}
        aria-haspopup="menu"
        onClick={() => setAberto((valor) => !valor)}
      >
        <span className={styles.avatar} aria-hidden="true">
          {iniciais(usuario.nome)}
        </span>
        <span className={styles.nome}>{usuario.nome.split(' ')[0]}</span>
      </button>

      {aberto && (
        <div className={styles.menu} role="menu">
          <p className={styles.saudacao}>Olá, {usuario.nome.split(' ')[0]}</p>
          <Link role="menuitem" to="/minha-conta" onClick={() => setAberto(false)}>
            Minha conta
          </Link>
          <Link role="menuitem" to="/minha-conta/reservas" onClick={() => setAberto(false)}>
            Minhas reservas
          </Link>
          <Link role="menuitem" to="/minha-conta/perfil" onClick={() => setAberto(false)}>
            Meus dados
          </Link>
          <button
            type="button"
            role="menuitem"
            className={styles.sair}
            onClick={() => {
              setAberto(false)
              sair()
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
