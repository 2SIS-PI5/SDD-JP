import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Badge from '../../components/atoms/Badge/Badge.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import { obterAcomodacao } from '../../services/accommodationService.js'
import { listarPagamentosDaReserva } from '../../services/paymentService.js'
import { cancelarReserva, obterReserva } from '../../services/reservationService.js'
import { useAuth } from '../../hooks/useAuth.js'
import { formatarData, formatarMoeda } from '../../utils/date.js'
import { STATUS_PAGAMENTO, STATUS_RESERVA } from '../../utils/reserva.js'
import styles from './AccountPages.module.css'

function ReservationDetail() {
  const { id } = useParams()
  const { usuario } = useAuth()
  const [reserva, setReserva] = useState(null)
  const [quarto, setQuarto] = useState(null)
  const [pagamentos, setPagamentos] = useState([])
  const [status, setStatus] = useState('carregando')
  const [erro, setErro] = useState('')
  const [confirmando, setConfirmando] = useState(false)
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    let ativo = true
    async function carregar() {
      try {
        const dados = await obterReserva(id)
        if (!ativo) return
        if (dados.usuarioId !== usuario.id) {
          setErro('Reserva não encontrada na sua conta.')
          setStatus('erro')
          return
        }
        const [acomodacao, historico] = await Promise.all([
          obterAcomodacao(dados.quartoId),
          listarPagamentosDaReserva(dados.id),
        ])
        if (!ativo) return
        setReserva(dados)
        setQuarto(acomodacao)
        setPagamentos(historico)
        setStatus('pronto')
      } catch (falha) {
        if (ativo) {
          setErro(falha.message)
          setStatus('erro')
        }
      }
    }
    carregar()
    return () => {
      ativo = false
    }
  }, [id, usuario.id])

  const cancelar = useCallback(async () => {
    setProcessando(true)
    try {
      const atualizada = await cancelarReserva(reserva.id)
      setReserva(atualizada)
      setConfirmando(false)
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setProcessando(false)
    }
  }, [reserva])

  if (status === 'carregando') {
    return <Spinner label="Carregando reserva..." />
  }

  if (status === 'erro' || !reserva) {
    return (
      <Alert tone="danger" title="Reserva indisponível">
        {erro || 'Não foi possível carregar esta reserva.'} <Link to="/minha-conta/reservas">Voltar para minhas reservas</Link>
      </Alert>
    )
  }

  const statusReserva = STATUS_RESERVA[reserva.status] ?? STATUS_RESERVA.SOLICITADA
  const statusPagamento = STATUS_PAGAMENTO[reserva.statusPagamento] ?? STATUS_PAGAMENTO.PENDENTE
  const podeCancelar = reserva.status !== 'CANCELADA'

  return (
    <div className={styles.stack}>
      <header className={styles.topo}>
        <div>
          <p className={styles.eyebrow}>Reserva {reserva.codigo}</p>
          <h1>{quarto?.nome}</h1>
          <div className={styles.acoes}>
            <Badge tone={statusReserva.tom}>{statusReserva.rotulo}</Badge>
            <Badge tone={statusPagamento.tom}>Pagamento: {statusPagamento.rotulo}</Badge>
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => window.print()}>
          Imprimir comprovante
        </Button>
      </header>

      {erro && <Alert tone="danger">{erro}</Alert>}

      <div className={styles.detalheGrid}>
        <section className={styles.bloco}>
          <h2>Hospedagem</h2>
          <p><strong>Check-in:</strong> {formatarData(reserva.dataInicio)}</p>
          <p><strong>Check-out:</strong> {formatarData(reserva.dataFim)}</p>
          <p><strong>Diárias:</strong> {reserva.diarias}</p>
          <p><strong>Hóspedes:</strong> {reserva.quantidadePessoas} ({reserva.adultos} adultos, {reserva.criancas} crianças)</p>
          <p><strong>Acomodação:</strong> {quarto?.categoria} · {quarto?.camas}</p>
        </section>

        <section className={styles.bloco}>
          <h2>Valores</h2>
          <p><strong>Diária:</strong> {formatarMoeda(reserva.precoDiaria)}</p>
          <p><strong>Taxas:</strong> {formatarMoeda(reserva.taxas)}</p>
          <p><strong>Total:</strong> {formatarMoeda(reserva.total)}</p>
          <p><strong>Forma de pagamento:</strong> {pagamentos[0]?.metodo ?? 'Não registrada'}</p>
        </section>

        <section className={styles.bloco}>
          <h2>Hóspede</h2>
          <p><strong>Nome:</strong> {reserva.hospede}</p>
          <p><strong>E-mail:</strong> {reserva.email}</p>
          <p><strong>Telefone:</strong> {reserva.telefone}</p>
          <p><strong>CPF:</strong> {reserva.cpf}</p>
        </section>

        <section className={styles.bloco}>
          <h2>Informações importantes</h2>
          <ul>
            <li>Check-in a partir das 15h; check-out até as 12h.</li>
            <li>{quarto?.politicaCancelamento}</li>
            <li>Reserva demonstrativa: não representa disponibilidade garantida em produção.</li>
          </ul>
        </section>
      </div>

      <section className={styles.bloco}>
        <h2>Histórico de pagamentos</h2>
        {pagamentos.length === 0 ? (
          <p>Nenhum pagamento registrado para esta reserva.</p>
        ) : (
          pagamentos.map((pagamento) => (
            <div key={pagamento.id} className={styles.pagamento}>
              <span>
                {formatarData(pagamento.criadoEm?.slice(0, 10))} · {pagamento.metodo} · {pagamento.referencia}
              </span>
              <span>
                {formatarMoeda(pagamento.valor)} — <strong>{pagamento.status}</strong>
              </span>
            </div>
          ))
        )}
      </section>

      <div className={styles.acoes}>
        <Button as={Link} to="/minha-conta/reservas" variant="ghost" size="sm">
          Voltar
        </Button>
        {podeCancelar && !confirmando && (
          <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmando(true)}>
            Cancelar reserva
          </Button>
        )}
      </div>

      {confirmando && (
        <Alert
          tone="warning"
          title="Confirmar cancelamento?"
          action={
            <div className={styles.acoes}>
              <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmando(false)}>
                Manter reserva
              </Button>
              <Button type="button" variant="primary" size="sm" onClick={cancelar} disabled={processando}>
                {processando ? 'Cancelando...' : 'Confirmar cancelamento'}
              </Button>
            </div>
          }
        >
          Esta ação altera o status para cancelada na demonstração.
        </Alert>
      )}
    </div>
  )
}

export default ReservationDetail
