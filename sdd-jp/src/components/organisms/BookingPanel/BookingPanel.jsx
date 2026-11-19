import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../atoms/Button/Button.jsx'
import DateRangePicker from '../DateRangePicker/DateRangePicker.jsx'
import GuestSelector from '../GuestSelector/GuestSelector.jsx'
import { verificarDisponibilidade } from '../../../services/availabilityService.js'
import { calcularDiarias, formatarMoeda, hojeISO, adicionarDias, intervaloValido } from '../../../utils/date.js'
import { calcularTotais } from '../../../utils/reserva.js'
import styles from './BookingPanel.module.css'

function BookingPanel({ quarto, valoresIniciais = {} }) {
  const navigate = useNavigate()
  const [inicio, setInicio] = useState(valoresIniciais.inicio ?? adicionarDias(hojeISO(), 1))
  const [fim, setFim] = useState(valoresIniciais.fim ?? adicionarDias(hojeISO(), 3))
  const [adultos, setAdultos] = useState(Number(valoresIniciais.adultos) || Math.min(2, quarto.capacidadeMaxima))
  const [criancas, setCriancas] = useState(Number(valoresIniciais.criancas) || 0)
  const [quartos, setQuartos] = useState(1)
  const [disponibilidade, setDisponibilidade] = useState('verificando')

  const diarias = calcularDiarias(inicio, fim)
  const totalHospedes = adultos + criancas
  const datasValidas = intervaloValido(inicio, fim)
  const excedeCapacidade = totalHospedes > quarto.capacidadeMaxima

  const totais = useMemo(
    () => calcularTotais({ precoDiaria: quarto.precoDiaria, diarias, quantidadeQuartos: quartos }),
    [quarto.precoDiaria, diarias, quartos],
  )

  useEffect(() => {
    let ativo = true
    if (!datasValidas) return undefined
    verificarDisponibilidade(quarto.id, inicio, fim)
      .then((disponivel) => {
        if (ativo) setDisponibilidade(disponivel ? 'disponivel' : 'indisponivel')
      })
      .catch(() => {
        if (ativo) setDisponibilidade('erro')
      })
    return () => {
      ativo = false
    }
  }, [quarto.id, inicio, fim, datasValidas])

  function reservar() {
    const params = new URLSearchParams({ inicio, fim, adultos, criancas, quartos })
    navigate(`/reservar/${quarto.id}?${params.toString()}`)
  }

  const podeReservar = datasValidas && !excedeCapacidade && disponibilidade === 'disponivel'

  return (
    <aside className={styles.panel} aria-label="Painel de reserva">
      <div className={styles.precoTopo}>
        <p>
          <strong>{formatarMoeda(quarto.precoDiaria)}</strong>
          <span>/ noite</span>
        </p>
        {quarto.avaliacao > 0 && <span className={styles.nota}>★ {quarto.avaliacao.toFixed(1)}</span>}
      </div>

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

      <div className={styles.resumo}>
        <div>
          <span>{formatarMoeda(quarto.precoDiaria)} × {diarias} {diarias === 1 ? 'diária' : 'diárias'}</span>
          <span>{formatarMoeda(totais.subtotal)}</span>
        </div>
        <div>
          <span>Taxas e serviços</span>
          <span>{formatarMoeda(totais.taxas)}</span>
        </div>
        <div className={styles.total}>
          <span>Total estimado</span>
          <strong>{formatarMoeda(totais.total)}</strong>
        </div>
      </div>

      {excedeCapacidade && (
        <p className={styles.aviso} role="alert">
          Esta acomodação acomoda até {quarto.capacidadeMaxima} hóspedes. Ajuste a quantidade.
        </p>
      )}

      {!datasValidas && (
        <p className={styles.aviso} role="alert">
          Selecione um período com saída posterior à entrada.
        </p>
      )}

      {datasValidas && disponibilidade === 'indisponivel' && (
        <p className={styles.aviso} role="alert">
          Esta acomodação não está disponível no período selecionado. Tente outras datas.
        </p>
      )}

      {disponibilidade === 'erro' && (
        <p className={styles.aviso} role="alert">
          Não foi possível verificar a disponibilidade agora.
        </p>
      )}

      {disponibilidade === 'verificando' && datasValidas && (
        <p className={styles.verificando}>Verificando disponibilidade...</p>
      )}

      <Button type="button" variant="primary" size="lg" full onClick={reservar} disabled={!podeReservar}>
        Reservar agora
      </Button>

      <p className={styles.notaRodape}>
        Você não será cobrado agora. A disponibilidade é uma simulação acadêmica baseada no mock.
      </p>
    </aside>
  )
}

export default BookingPanel
