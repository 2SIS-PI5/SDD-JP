import { useState } from 'react'
import Alert from '../../../components/atoms/Alert/Alert.jsx'
import Badge from '../../../components/atoms/Badge/Badge.jsx'
import Button from '../../../components/atoms/Button/Button.jsx'
import PriceBreakdown from '../../../components/molecules/PriceBreakdown/PriceBreakdown.jsx'
import { formatarData, formatarMoeda } from '../../../utils/date.js'
import styles from './ReserveSteps.module.css'

function StepRevisao({ quarto, estadia, hospede, totais, diarias, onConfirmar, processando, erro }) {
  const [aceite, setAceite] = useState(false)
  const [validacao, setValidacao] = useState('')

  function confirmar() {
    if (!aceite) {
      setValidacao('É necessário aceitar as condições da reserva demonstrativa.')
      return
    }
    setValidacao('')
    onConfirmar()
  }

  return (
    <div className={styles.step}>
      <h2>Revise sua reserva</h2>
      <p className={styles.intro}>Confira os dados antes de seguir para o pagamento simulado.</p>

      <div className={styles.revisaoGrid}>
        <div className={styles.bloco}>
          <h3>Acomodação</h3>
          <p className={styles.destaque}>{quarto.nome}</p>
          <p>{quarto.categoria} · até {quarto.capacidadeMaxima} hóspedes · {quarto.camas}</p>
          <Badge tone="neutral">{formatarMoeda(quarto.precoDiaria)} / noite</Badge>
        </div>

        <div className={styles.bloco}>
          <h3>Hospedagem</h3>
          <p className={styles.destaque}>
            {formatarData(estadia.inicio)} a {formatarData(estadia.fim)}
          </p>
          <p>
            {diarias} {diarias === 1 ? 'diária' : 'diárias'} · {estadia.adultos + estadia.criancas} hóspedes ·{' '}
            {estadia.quartos} {estadia.quartos === 1 ? 'quarto' : 'quartos'}
          </p>
        </div>

        <div className={styles.bloco}>
          <h3>Hóspede</h3>
          <p className={styles.destaque}>{hospede.nome}</p>
          <p>{hospede.email}</p>
          <p>{hospede.telefone} · CPF {hospede.cpf}</p>
        </div>

        <div className={styles.bloco}>
          <h3>Pagamento</h3>
          <PriceBreakdown
            quarto={quarto}
            inicio={estadia.inicio}
            fim={estadia.fim}
            diarias={diarias}
            quartos={estadia.quartos}
            totais={totais}
            mostrarPolitica
          />
        </div>
      </div>

      <label className={styles.aceite}>
        <input type="checkbox" checked={aceite} onChange={(evento) => setAceite(evento.target.checked)} />
        <span>
          Entendo que esta é uma solicitação demonstrativa e que a disponibilidade não é garantida até a
          confirmação do pagamento simulado.
        </span>
      </label>

      {validacao && <Alert tone="danger">{validacao}</Alert>}
      {erro && <Alert tone="danger" title="Não foi possível criar a reserva">{erro}</Alert>}

      <Button type="button" variant="primary" size="lg" onClick={confirmar} disabled={processando}>
        {processando ? 'Criando reserva...' : 'Ir para o pagamento'}
      </Button>
    </div>
  )
}

export default StepRevisao
