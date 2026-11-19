import { useCallback, useEffect, useMemo, useState } from 'react'
import AccommodationCard from '../../components/molecules/AccommodationCard/AccommodationCard.jsx'
import FiltersPanel from '../../components/molecules/FiltersPanel/FiltersPanel.jsx'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import EmptyState from '../../components/atoms/EmptyState/EmptyState.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import { filtrarAcomodacoes, listarAcomodacoes } from '../../services/accommodationService.js'
import styles from './AccommodationsPage.module.css'

const FILTROS_INICIAIS = {
  categorias: [],
  capacidade: 0,
  precoMaximo: 0,
  comodidades: [],
  ordenacao: 'destaque',
  busca: '',
}

function AccommodationsPage() {
  const [acomodacoes, setAcomodacoes] = useState([])
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)

  useEffect(() => {
    let ativo = true
    listarAcomodacoes()
      .then((dados) => {
        if (!ativo) return
        setAcomodacoes(dados)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [tentativa])

  const tentarNovamente = useCallback(() => {
    setStatus('carregando')
    setTentativa((valor) => valor + 1)
  }, [])

  const categorias = useMemo(
    () => [...new Set(acomodacoes.map((quarto) => quarto.categoria))].sort(),
    [acomodacoes],
  )
  const comodidades = useMemo(
    () => [...new Set(acomodacoes.flatMap((quarto) => quarto.comodidades))].sort(),
    [acomodacoes],
  )

  const resultados = useMemo(() => filtrarAcomodacoes(acomodacoes, filtros), [acomodacoes, filtros])

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <span className="eyebrow">Acomodações</span>
          <h1>Espaços para cada ritmo de estadia</h1>
          <p>
            Do quarto standard à suíte presidencial, todas as acomodações do Hotel Sereno foram
            desenhadas para acolher com simplicidade e conforto.
          </p>
        </div>
      </section>

      <section className={`container ${styles.layout}`}>
        <FiltersPanel
          filtros={filtros}
          onChange={setFiltros}
          categorias={categorias}
          comodidades={comodidades}
          onLimpar={() => setFiltros(FILTROS_INICIAIS)}
        />

        <div>
          <div className={styles.toolbar}>
            <label className={styles.busca}>
              <span className="sr-only">Buscar acomodação</span>
              <input
                type="search"
                placeholder="Buscar por nome ou descrição"
                value={filtros.busca}
                onChange={(evento) => setFiltros({ ...filtros, busca: evento.target.value })}
              />
            </label>
            <label className={styles.ordenacao}>
              <span>Ordenar por</span>
              <select
                value={filtros.ordenacao}
                onChange={(evento) => setFiltros({ ...filtros, ordenacao: evento.target.value })}
              >
                <option value="destaque">Destaques</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="avaliacao">Melhor avaliação</option>
              </select>
            </label>
          </div>

          {status === 'carregando' && (
            <div className={styles.estado}>
              <Spinner label="Carregando acomodações..." />
            </div>
          )}

          {status === 'erro' && (
            <Alert
              tone="danger"
              title="Não foi possível carregar as acomodações"
              action={
                <Button type="button" variant="ghost" size="sm" onClick={tentarNovamente}>
                  Tentar novamente
                </Button>
              }
            >
              Verifique se a API mock está em execução e tente novamente.
            </Alert>
          )}

          {status === 'pronto' && (
            <>
              <p className={styles.contagem} aria-live="polite">
                {resultados.length} {resultados.length === 1 ? 'acomodação encontrada' : 'acomodações encontradas'}
              </p>

              {resultados.length === 0 ? (
                <EmptyState
                  title="Nenhuma acomodação corresponde aos filtros"
                  description="Ajuste a categoria, o preço ou as comodidades para ampliar os resultados."
                  action={
                    <Button type="button" variant="ghost" size="sm" onClick={() => setFiltros(FILTROS_INICIAIS)}>
                      Limpar filtros
                    </Button>
                  }
                />
              ) : (
                <div className={styles.grid}>
                  {resultados.map((quarto) => (
                    <AccommodationCard key={quarto.id} quarto={quarto} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default AccommodationsPage
