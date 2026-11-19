import { Link } from 'react-router-dom'
import Badge from '../../atoms/Badge/Badge.jsx'
import { formatarData, formatarMoeda } from '../../../utils/date.js'
import { STATUS_PAGAMENTO, STATUS_RESERVA } from '../../../utils/reserva.js'
import styles from './ReservationCard.module.css'

function ReservationCard({ reserva, quarto }) {
  const status = STATUS_RESERVA[reserva.status] ?? STATUS_RESERVA.SOLICITADA
  const pagamento = STATUS_PAGAMENTO[reserva.statusPagamento] ?? STATUS_PAGAMENTO.PENDENTE

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          src={quarto?.imagens?.[0] ?? 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
          alt={quarto ? `Foto de ${quarto.nome}` : 'Acomodação'}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.topo}>
          <div>
            <p className={styles.codigo}>{reserva.codigo}</p>
            <h3>{quarto?.nome ?? 'Acomodação'}</h3>
          </div>
          <div className={styles.badges}>
            <Badge tone={status.tom}>{status.rotulo}</Badge>
            <Badge tone={pagamento.tom}>Pagamento: {pagamento.rotulo}</Badge>
          </div>
        </div>

        <dl className={styles.detalhes}>
          <div>
            <dt>Check-in</dt>
            <dd>{formatarData(reserva.dataInicio)}</dd>
          </div>
          <div>
            <dt>Check-out</dt>
            <dd>{formatarData(reserva.dataFim)}</dd>
          </div>
          <div>
            <dt>Hóspedes</dt>
            <dd>{reserva.quantidadePessoas}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatarMoeda(reserva.total)}</dd>
          </div>
        </dl>

        <Link to={`/minha-conta/reservas/${reserva.id}`} className={styles.link}>
          Ver detalhes →
        </Link>
      </div>
    </article>
  )
}

export default ReservationCard
