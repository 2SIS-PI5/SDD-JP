import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>Hotel Sereno</p>
          <p>
            Um refúgio contemporâneo onde arquitetura, natureza e hospitalidade se encontram para criar
            estadias memoráveis.
          </p>
          <div className={styles.social} aria-label="Redes sociais">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>

        <div>
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/acomodacoes">Acomodações</Link></li>
            <li><Link to="/buscar">Disponibilidade</Link></li>
            <li><Link to="/avaliacoes">Avaliações</Link></li>
            <li><Link to="/sobre">Sobre o hotel</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4>Reservas</h4>
          <ul>
            <li><Link to="/minha-conta/reservas">Minhas reservas</Link></li>
            <li><Link to="/login">Entrar na conta</Link></li>
            <li><Link to="/cadastro">Criar conta</Link></li>
            <li><Link to="/contato">Central de atendimento</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <address>
            Av. das Palmeiras, 1200<br />
            Jardim Sereno — São Paulo, SP<br />
            <a href="tel:+551140028922">(11) 4002-8922</a><br />
            <a href="mailto:reservas@hotelsereno.com.br">reservas@hotelsereno.com.br</a>
          </address>
          <p className={styles.hours}>Recepção 24 horas</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Hotel Sereno. Projeto acadêmico de demonstração.</p>
        <div className={styles.legal}>
          <Link to="/sobre">Política de privacidade</Link>
          <Link to="/sobre">Termos de uso</Link>
          <Link to="/contato">Informações sobre reservas</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
