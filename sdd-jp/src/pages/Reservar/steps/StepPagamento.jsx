import Alert from '../../../components/atoms/Alert/Alert.jsx'
import Badge from '../../../components/atoms/Badge/Badge.jsx'
import PriceBreakdown from '../../../components/molecules/PriceBreakdown/PriceBreakdown.jsx'
import PaymentForm from '../../../components/organisms/PaymentForm/PaymentForm.jsx'
import { formatarData } from '../../../utils/date.js'
import styles from './ReserveSteps.module.css'

function StepPagamento({ quarto, estadia, totais, diarias, onPagar, processando, erro }) {
  return (
    <div className={styles.step}>
      <h2>Pagamento simulado</h2>
      <p className={styles.intro}>
        Escolha PIX ou cartão fictício. Você pode simular aprovação ou recusa para testar o fluxo.
      </p>

      <div className={styles.pagamentoTopo}>
        <div>
          <Badge tone="warning">Aguardando pagamento</Badge>
          <p className={styles.destaque}>{quarto.nome}</p>
          <p>
            {formatarData(estadia.inicio)} a {formatarData(estadia.fim)} · {estadia.adultos + estadia.criancas}{' '}
            hóspedes
          </p>
        </div>
        <PriceBreakdown
          quarto={quarto}
          inicio={estadia.inicio}
          fim={estadia.fim}
          diarias={diarias}
          quartos={estadia.quartos}
          totais={totais}
        />
      </div>

      {erro && <Alert tone="danger" title="Pagamento não aprovado">{erro}</Alert>}

      <PaymentForm total={totais.total} onPagar={onPagar} processando={processando} />
    </div>
  )
}

export default StepPagamento
