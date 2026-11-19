import { Link } from 'react-router-dom'
import Badge from '../../../components/atoms/Badge/Badge.jsx'
import Button from '../../../components/atoms/Button/Button.jsx'
import { formatarData, formatarMoeda } from '../../../utils/date.js'
import styles from './ReserveSteps.module.css'

function StepConfirmacao({ confirmacao, quarto, estadia, diarias, totais }) {
  return (
    <div className={`${styles.step} ${styles.confirmacao}`}>
      <span className={styles.sucesso} aria-hidden="true">
        ✓
      </span>
      <h2>Reserva confirmada</h2>
      <p className={styles.intro}>
        Pagamento simulado aprovado. Guarde o código abaixo para consultar sua hospedagem.
      </p>

      <p className={styles.codigo}>{confirmacao.codigo}</p>

      <div className={styles.revisaoGrid}>
        <div className={styles.bloco}>
          <h3>Acomodação</h3>
          <p className={styles.destaque}>{quarto.nome}</p>
          <p>{quarto.categoria}</p>
        </div>
        <div className={styles.bloco}>
          <h3>Hospedagem</h3>
          <p className={styles.destaque}>
            {formatarData(estadia.inicio)} a {formatarData(estadia.fim)}
          </p>
          <p>{diarias} {diarias === 1 ? 'diária' : 'diárias'}</p>
        </div>
        <div className={styles.bloco}>
          <h3>Pagamento</h3>
          <p className={styles.destaque}>{formatarMoeda(totais.total)}</p>
          <Badge tone="success">Aprovado</Badge>
        </div>
        <div className={styles.bloco}>
          <h3>Status da reserva</h3>
          <Badge tone="success">Confirmada</Badge>
          <p className={styles.codigoPequeno}>{confirmacao.codigo}</p>
        </div>
      </div>

      <div className={styles.acoesConfirmacao}>
        <Button as={Link} to={`/minha-conta/reservas/${confirmacao.id}`} variant="primary" size="lg">
          Ver minha reserva
        </Button>
        <Button as={Link} to="/" variant="ghost" size="lg">
          Voltar ao início
        </Button>
      </div>
    </div>
  )
}

export default StepConfirmacao
