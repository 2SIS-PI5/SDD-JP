import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AccommodationCard from '../../components/molecules/AccommodationCard/AccommodationCard.jsx'
import SearchBar from '../../components/molecules/SearchBar/SearchBar.jsx'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import EmptyState from '../../components/atoms/EmptyState/EmptyState.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import { buscarDisponiveis } from '../../services/availabilityService.js'
import { adicionarDias, calcularDiarias, formatarData, hojeISO, intervaloValido } from '../../utils/date.js'
import styles from './SearchResultsPage.module.css'

function valoresDaBusca(params) {
  const inicio = params.get('inicio') ?? adicionarDias(hojeISO(), 1)
  const fim = params.get('fim') ?? adicionarDias(hojeISO(), 3)
  return {
    inicio,
    fim,
    adultos: Number(params.get('adultos')) || 2,
    criancas: Number(params.get('criancas')) || 0,
    quartos: Number(params.get('quartos')) || 1,
  }
}

function SearchResultsPage() {
  const [params] = useSearchParams()
  const busca = useMemo(() => valoresDaBusca(params), [params])
  const [resultados, setResultados] = useState([])
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)
  const [ordenacao, setOrdenacao] = useState('destaque')

  const { inicio, fim, adultos, criancas, quartos } = busca
  const diarias = calcularDiarias(inicio, fim)
  const datasValidas = intervaloValido(inicio, fim)

  useEffect(() => {
    let ativo = true
    if (!datasValidas) return undefined
    buscarDisponiveis({ inicio, fim, adultos, criancas, quartos })
      .then((dados) => {
        if (!ativo) return
        setResultados(dados)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [inicio, fim, adultos, criancas, quartos, tentativa, datasValidas])

  const tentarNovamente = useCallback(() => {
    setStatus('carregando')
    setTentativa((valor) => valor + 1)
  }, [])

  const ordenados = useMemo(() => {
    const lista = [...resultados]
    if (ordenacao === 'menor-preco') return lista.sort((a, b) => a.precoDiaria - b.precoDiaria)
    if (ordenacao === 'maior-preco') return lista.sort((a, b) => b.precoDiaria - a.precoDiaria)
    if (ordenacao === 'avaliacao') return lista.sort((a, b) => b.avaliacao - a.avaliacao)
    return lista.sort((a, b) => Number(b.destaque) - Number(a.destaque) || b.avaliacao - a.avaliacao)
  }, [resultados, ordenacao])

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <span className="eyebrow">Disponibilidade</span>
          <h1>Encontre a acomodação para as suas datas</h1>
          <p>
            {formatarData(inicio)} a {formatarData(fim)} · {diarias} {diarias === 1 ? 'diária' : 'diárias'} ·{' '}
            {Number(adultos) + Number(criancas)} hóspedes · {quartos} {quartos === 1 ? 'quarto' : 'quartos'}
          </p>
          <div className={styles.busca}>
            <SearchBar valoresIniciais={busca} variante="compacta" />
          </div>
        </div>
      </section>

      <section className={`container ${styles.resultados}`}>
        {!datasValidas ? (
          <Alert tone="warning" title="Datas inválidas">
            A data de saída precisa ser posterior à data de entrada. Ajuste a busca acima.
          </Alert>
        ) : (
          <>
            <div className={styles.toolbar}>
              <div>
                <h2 className={styles.titulo}>Acomodações disponíveis</h2>
                <p className={styles.subtitulo}>
                  Disponibilidade calculada a partir das reservas registradas na API mock.
                </p>
              </div>
              <label className={styles.ordenacao}>
                <span>Ordenar por</span>
                <select value={ordenacao} onChange={(evento) => setOrdenacao(evento.target.value)}>
                  <option value="destaque">Destaques</option>
                  <option value="menor-preco">Menor preço</option>
                  <option value="maior-preco">Maior preço</option>
                  <option value="avaliacao">Melhor avaliação</option>
                </select>
              </label>
            </div>

            <p className={styles.contagem} aria-live="polite">
              {status === 'pronto'
                ? `${ordenados.length} ${ordenados.length === 1 ? 'acomodação disponível' : 'acomodações disponíveis'}`
                : 'Consultando disponibilidade...'}
            </p>

            {status === 'carregando' && (
              <div className={styles.estado}>
                <Spinner label="Consultando disponibilidade..." />
              </div>
            )}

            {status === 'erro' && (
              <Alert
                tone="danger"
                title="Não foi possível consultar a disponibilidade"
                action={
                  <Button type="button" variant="ghost" size="sm" onClick={tentarNovamente}>
                    Tentar novamente
                  </Button>
                }
              >
                Verifique se a API mock está em execução.
              </Alert>
            )}

            {status === 'pronto' && ordenados.length === 0 && (
              <EmptyState
                icon="☾"
                title="Nenhuma acomodação disponível nessas datas"
                description="Tente alterar o período ou a quantidade de hóspedes. Nossa equipe também pode ajudar pelo telefone (11) 4002-8922."
                action={
                  <Button as={Link} to="/acomodacoes" variant="ghost" size="sm">
                    Ver todas as acomodações
                  </Button>
                }
              />
            )}

            {status === 'pronto' && ordenados.length > 0 && (
              <div className={styles.grid}>
                {ordenados.map((quarto) => (
                  <AccommodationCard key={quarto.id} quarto={quarto} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default SearchResultsPage
