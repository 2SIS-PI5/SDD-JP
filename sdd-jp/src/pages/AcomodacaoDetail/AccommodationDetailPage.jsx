import { useCallback, useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Gallery from '../../components/molecules/Gallery/Gallery.jsx'
import BookingPanel from '../../components/organisms/BookingPanel/BookingPanel.jsx'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Badge from '../../components/atoms/Badge/Badge.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import Rating from '../../components/atoms/Rating/Rating.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import { obterAcomodacao } from '../../services/accommodationService.js'
import { formatarMoeda } from '../../utils/date.js'
import styles from './AccommodationDetailPage.module.css'

function AccommodationDetailPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const [quarto, setQuarto] = useState(null)
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)

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

  if (status === 'carregando') {
    return (
      <div className={`container ${styles.estado}`}>
        <Spinner label="Carregando acomodação..." />
      </div>
    )
  }

  if (status === 'erro' || !quarto) {
    return (
      <div className={`container ${styles.estado}`}>
        <Alert
          tone="danger"
          title="Não foi possível carregar esta acomodação"
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

  const valoresIniciais = {
    inicio: params.get('inicio') ?? undefined,
    fim: params.get('fim') ?? undefined,
    adultos: params.get('adultos') ?? undefined,
    criancas: params.get('criancas') ?? undefined,
  }

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Trilha de navegação">
        <Link to="/">Início</Link>
        <span aria-hidden="true">/</span>
        <Link to="/acomodacoes">Acomodações</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{quarto.nome}</span>
      </nav>

      <div className={styles.topo}>
        <div>
          <Badge tone="accent">{quarto.categoria}</Badge>
          <h1>{quarto.nome}</h1>
          <div className={styles.meta}>
            <Rating nota={quarto.avaliacao} total={quarto.totalAvaliacoes} />
            <span>·</span>
            <span>Até {quarto.capacidadeMaxima} hóspedes</span>
            <span>·</span>
            <span>{quarto.camas}</span>
          </div>
        </div>
        <p className={styles.precoTopo}>
          <strong>{formatarMoeda(quarto.precoDiaria)}</strong> / noite
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.conteudo}>
          <Gallery imagens={quarto.imagens} nome={quarto.nome} />

          <section className={styles.secao}>
            <h2>Sobre a acomodação</h2>
            <p>{quarto.descricaoLonga ?? quarto.descricao}</p>
          </section>

          <section className={styles.secao}>
            <h2>Comodidades</h2>
            <ul className={styles.comodidades}>
              {quarto.comodidades.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.secao}>
            <h2>Informações da hospedagem</h2>
            <dl className={styles.info}>
              <div>
                <dt>Check-in</dt>
                <dd>A partir das 15h</dd>
              </div>
              <div>
                <dt>Check-out</dt>
                <dd>Até as 12h</dd>
              </div>
              <div>
                <dt>Capacidade</dt>
                <dd>Até {quarto.capacidadeMaxima} hóspedes</dd>
              </div>
              <div>
                <dt>Camas</dt>
                <dd>{quarto.camas}</dd>
              </div>
              <div>
                <dt>Política de cancelamento</dt>
                <dd>{quarto.politicaCancelamento}</dd>
              </div>
            </dl>
          </section>
        </div>

        <BookingPanel quarto={quarto} valoresIniciais={valoresIniciais} />
      </div>
    </div>
  )
}

export default AccommodationDetailPage
