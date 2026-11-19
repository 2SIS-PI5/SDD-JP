import { formatarData, formatarMoeda } from '../../../utils/date.js'
import styles from './PriceBreakdown.module.css'

function PriceBreakdown({ quarto, inicio, fim, diarias, quartos = 1, totais, mostrarPolitica = false }) {
  return (
    <div className={styles.resumo}>
      <div className={styles.linha}>
        <span>
          {formatarMoeda(quarto.precoDiaria)} × {diarias} {diarias === 1 ? 'diária' : 'diárias'} × {quartos}{' '}
          {quartos === 1 ? 'quarto' : 'quartos'}
        </span>
        <span>{formatarMoeda(totais.subtotal)}</span>
      </div>
      <div className={styles.linha}>
        <span>Taxas e serviços</span>
        <span>{formatarMoeda(totais.taxas)}</span>
      </div>
      <div className={styles.total}>
        <span>Total</span>
        <strong>{formatarMoeda(totais.total)}</strong>
      </div>
      <p className={styles.periodo}>
        {formatarData(inicio)} a {formatarData(fim)}
      </p>
      {mostrarPolitica && <p className={styles.politica}>{quarto.politicaCancelamento}</p>}
    </div>
  )
}

export default PriceBreakdown
