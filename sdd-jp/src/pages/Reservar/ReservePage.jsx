import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import { obterAcomodacao } from '../../services/accommodationService.js'
import { verificarDisponibilidade } from '../../services/availabilityService.js'
import { criarReserva } from '../../services/reservationService.js'
import { processarPagamento } from '../../services/paymentService.js'
import { useAuth } from '../../hooks/useAuth.js'
import { adicionarDias, calcularDiarias, hojeISO, intervaloValido } from '../../utils/date.js'
import { calcularTotais } from '../../utils/reserva.js'
import StepHospedagem from './steps/StepHospedagem.jsx'
import StepHospede from './steps/StepHospede.jsx'
import StepRevisao from './steps/StepRevisao.jsx'
import StepPagamento from './steps/StepPagamento.jsx'
import StepConfirmacao from './steps/StepConfirmacao.jsx'
import styles from './ReservePage.module.css'

const ETAPAS = ['Hospedagem', 'Hóspede', 'Revisão', 'Pagamento', 'Confirmação']

function datasIniciaisDaUrl(params) {
  const inicio = params.get('inicio')
  const fim = params.get('fim')
  if (intervaloValido(inicio, fim) && inicio >= hojeISO()) return { inicio, fim }
  return { inicio: adicionarDias(hojeISO(), 1), fim: adicionarDias(hojeISO(), 3) }
}

function numeroDaUrl(params, chave, padrao, minimo = 0) {
  const valor = Number(params.get(chave))
  return Number.isFinite(valor) && valor >= minimo ? valor : padrao
}

function ReservePage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { usuario } = useAuth()
  const [quarto, setQuarto] = useState(null)
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)
  const [etapa, setEtapa] = useState(1)

  const [estadia, setEstadia] = useState(() => ({
    ...datasIniciaisDaUrl(params),
    adultos: numeroDaUrl(params, 'adultos', 2, 1),
    criancas: numeroDaUrl(params, 'criancas', 0),
    quartos: numeroDaUrl(params, 'quartos', 1, 1),
  }))
  const [hospede, setHospede] = useState({
    nome: usuario?.nome ?? '',
    email: usuario?.email ?? '',
    telefone: usuario?.telefone ?? '',
    cpf: usuario?.cpf ?? '',
  })
  const [reserva, setReserva] = useState(null)
  const [confirmacao, setConfirmacao] = useState(null)

  const [verificando, setVerificando] = useState(false)
  const [erroEstadia, setErroEstadia] = useState('')
  const [erroHospede, setErroHospede] = useState('')
  const [erroRevisao, setErroRevisao] = useState('')
  const [erroPagamento, setErroPagamento] = useState('')
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    let ativo = true
    obterAcomodacao(id)
      .then((dados) => {
        if (!ativo) return
        setQuarto(dados)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [id, tentativa])

  const tentarNovamente = useCallback(() => {
    setStatus('carregando')
    setTentativa((valor) => valor + 1)
  }, [])

  const diarias = calcularDiarias(estadia.inicio, estadia.fim)
  const totais = useMemo(
    () =>
      calcularTotais({
        precoDiaria: quarto?.precoDiaria ?? 0,
        diarias,
        quantidadeQuartos: estadia.quartos,
      }),
    [quarto, diarias, estadia.quartos],
  )

  async function continuarHospedagem(novaEstadia) {
    setErroEstadia('')
    setVerificando(true)
    try {
      const disponivel = await verificarDisponibilidade(id, novaEstadia.inicio, novaEstadia.fim)
      if (!disponivel) {
        setErroEstadia('A acomodação não está mais disponível nesse período. Escolha outras datas.')
        return
      }
      setEstadia(novaEstadia)
      setEtapa(2)
    } catch (erro) {
      setErroEstadia(erro.message)
    } finally {
      setVerificando(false)
    }
  }

  function continuarHospede(dados) {
    setHospede(dados)
    setErroHospede('')
    setEtapa(3)
  }

  async function confirmarRevisao() {
    setErroRevisao('')
    setProcessando(true)
    try {
      const criada = await criarReserva({
        usuarioId: usuario.id,
        quartoId: quarto.id,
        hospede: hospede.nome,
        email: hospede.email,
        telefone: hospede.telefone,
        cpf: hospede.cpf,
        dataInicio: estadia.inicio,
        dataFim: estadia.fim,
        adultos: estadia.adultos,
        criancas: estadia.criancas,
        quantidadePessoas: estadia.adultos + estadia.criancas,
        quantidadeQuartos: estadia.quartos,
        diarias,
        precoDiaria: quarto.precoDiaria,
        taxas: totais.taxas,
        total: totais.total,
      })
      setReserva(criada)
      setEtapa(4)
    } catch (erro) {
      setErroRevisao(erro.message)
    } finally {
      setProcessando(false)
    }
  }

  async function pagar({ metodo, parcelas, resultado, cartaoFinal }) {
    setErroPagamento('')
    setProcessando(true)
    try {
      const pagamento = await processarPagamento({
        reservaId: reserva.id,
        metodo,
        valor: totais.total,
        parcelas,
        resultado,
      })
      if (pagamento.status === 'APROVADO') {
        setConfirmacao({
          ...reserva,
          status: 'CONFIRMADA',
          statusPagamento: 'APROVADO',
          metodo,
          cartaoFinal,
        })
        setEtapa(5)
      } else {
        setErroPagamento('O pagamento foi recusado na simulação. Tente novamente com outra forma ou resultado.')
      }
    } catch (erro) {
      setErroPagamento(erro.message)
    } finally {
      setProcessando(false)
    }
  }

  if (status === 'carregando') {
    return (
      <div className={`container ${styles.estado}`}>
        <Spinner label="Preparando sua reserva..." />
      </div>
    )
  }

  if (status === 'erro' || !quarto) {
    return (
      <div className={`container ${styles.estado}`}>
        <Alert
          tone="danger"
          title="Não foi possível iniciar a reserva"
          action={
            <Button type="button" variant="ghost" size="sm" onClick={tentarNovamente}>
              Tentar novamente
            </Button>
          }
        >
          Verifique se a API mock está em execução.
        </Alert>
      </div>
    )
  }

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Trilha de navegação">
        <Link to="/acomodacoes">Acomodações</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/acomodacoes/${quarto.id}`}>{quarto.nome}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Reserva</span>
      </nav>

      <div className={styles.layout}>
        <aside className={styles.lateral}>
          <img src={quarto.imagens[0]} alt={`${quarto.nome} — foto da acomodação`} />
          <h2>{quarto.nome}</h2>
          <p className={styles.categoria}>{quarto.categoria}</p>
          <ul>
            <li>Até {quarto.capacidadeMaxima} hóspedes</li>
            <li>{quarto.camas}</li>
            <li>{quarto.politicaCancelamento}</li>
          </ul>
        </aside>

        <div className={styles.principal}>
          <ol className={styles.stepper} aria-label="Etapas da reserva">
            {ETAPAS.map((rotulo, indice) => {
              const numero = indice + 1
              const estado = numero < etapa ? styles.concluida : numero === etapa ? styles.atual : ''
              return (
                <li key={rotulo} className={estado} aria-current={numero === etapa ? 'step' : undefined}>
                  <span>{numero < etapa ? '✓' : numero}</span>
                  <small>{rotulo}</small>
                </li>
              )
            })}
          </ol>

          {etapa === 1 && (
            <StepHospedagem
              quarto={quarto}
              estadia={estadia}
              onContinuar={continuarHospedagem}
              verificando={verificando}
              erro={erroEstadia}
            />
          )}

          {etapa === 2 && (
            <StepHospede hospede={hospede} onContinuar={continuarHospede} erro={erroHospede} />
          )}

          {etapa === 3 && (
            <StepRevisao
              quarto={quarto}
              estadia={estadia}
              hospede={hospede}
              totais={totais}
              diarias={diarias}
              onConfirmar={confirmarRevisao}
              processando={processando}
              erro={erroRevisao}
            />
          )}

          {etapa === 4 && (
            <StepPagamento
              quarto={quarto}
              estadia={estadia}
              totais={totais}
              diarias={diarias}
              onPagar={pagar}
              processando={processando}
              erro={erroPagamento}
            />
          )}

          {etapa === 5 && (
            <StepConfirmacao
              confirmacao={confirmacao}
              quarto={quarto}
              estadia={estadia}
              diarias={diarias}
              totais={totais}
            />
          )}

          {etapa > 1 && etapa < 5 && (
            <button type="button" className={styles.voltar} onClick={() => setEtapa((valor) => valor - 1)}>
              ← Voltar uma etapa
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReservePage
