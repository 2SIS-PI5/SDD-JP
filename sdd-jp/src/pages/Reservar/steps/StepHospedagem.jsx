import { useState } from 'react'
import Button from '../../../components/atoms/Button/Button.jsx'
import DateRangePicker from '../../../components/molecules/DateRangePicker/DateRangePicker.jsx'
import GuestSelector from '../../../components/molecules/GuestSelector/GuestSelector.jsx'
import Alert from '../../../components/atoms/Alert/Alert.jsx'
import { formatarMoeda, intervaloValido } from '../../../utils/date.js'
import { calcularTotais } from '../../../utils/reserva.js'
import styles from './ReserveSteps.module.css'

function StepHospedagem({ quarto, estadia, onContinuar, verificando, erro }) {
  const [inicio, setInicio] = useState(estadia.inicio)
  const [fim, setFim] = useState(estadia.fim)
  const [adultos, setAdultos] = useState(estadia.adultos)
  const [criancas, setCriancas] = useState(estadia.criancas)
  const [quartos, setQuartos] = useState(estadia.quartos ?? 1)
  const [validacao, setValidacao] = useState('')

  const diarias = intervaloValido(inicio, fim)
    ? Math.round((new Date(fim) - new Date(inicio)) / 86400000)
    : 0
  const totais = calcularTotais({ precoDiaria: quarto.precoDiaria, diarias, quantidadeQuartos: quartos })

  function continuar() {
    if (!intervaloValido(inicio, fim)) {
      setValidacao('A data de saída deve ser posterior à data de entrada.')
      return
    }
    if (adultos + criancas > quarto.capacidadeMaxima) {
      setValidacao(`Esta acomodação acomoda até ${quarto.capacidadeMaxima} hóspedes.`)
      return
    }
    setValidacao('')
    onContinuar({ inicio, fim, adultos, criancas, quartos })
  }

  return (
    <div className={styles.step}>
      <h2>Dados da hospedagem</h2>
      <p className={styles.intro}>
        Confirme o período e os hóspedes. Verificaremos a disponibilidade antes de avançar.
      </p>

      <div className={styles.campoDuplo}>
        <DateRangePicker inicio={inicio} fim={fim} onChange={(datas) => {
          setInicio(datas.inicio)
          setFim(datas.fim)
        }} />
        <GuestSelector
          adultos={adultos}
          criancas={criancas}
          quartos={quartos}
          onChange={(valores) => {
            setAdultos(valores.adultos)
            setCriancas(valores.criancas)
            setQuartos(valores.quartos)
          }}
        />
      </div>

      <div className={styles.resumoCurto}>
        <span>{diarias} {diarias === 1 ? 'diária' : 'diárias'}</span>
        <span>{adultos + criancas} hóspedes</span>
        <span>Total estimado {formatarMoeda(totais.total)}</span>
      </div>

      {validacao && <Alert tone="danger">{validacao}</Alert>}
      {erro && <Alert tone="warning" title="Disponibilidade">{erro}</Alert>}

      <Button type="button" variant="primary" size="lg" onClick={continuar} disabled={verificando}>
        {verificando ? 'Verificando disponibilidade...' : 'Continuar'}
      </Button>
    </div>
  )
}

export default StepHospedagem
