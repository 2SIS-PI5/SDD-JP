import { Link } from 'react-router-dom'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Badge from '../../components/atoms/Badge/Badge.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import EmptyState from '../../components/atoms/EmptyState/EmptyState.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import ReservationCard from '../../components/molecules/ReservationCard/ReservationCard.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useMinhasReservas } from '../../hooks/useMinhasReservas.js'
import { formatarData, formatarMoeda, hojeISO } from '../../utils/date.js'
import styles from './AccountPages.module.css'

function AccountHome() {
  const { usuario } = useAuth()
  const { reservas, quartosPorId, status, recarregar } = useMinhasReservas(usuario.id)

  const proxima = reservas
    .filter((reserva) => reserva.status === 'CONFIRMADA' && reserva.dataFim >= hojeISO())
    .sort((a, b) => a.dataInicio.localeCompare(b.dataInicio))[0]

  const confirmadas = reservas.filter((reserva) => reserva.status === 'CONFIRMADA').length
  const pendentes = reservas.filter((reserva) => reserva.statusPagamento === 'PENDENTE').length
  const totalGasto = reservas
    .filter((reserva) => reserva.statusPagamento === 'APROVADO')
    .reduce((soma, reserva) => soma + Number(reserva.total), 0)

  return (
    <div className={styles.stack}>
      <header className={styles.topo}>
        <div>
          <p className={styles.eyebrow}>Visão geral</p>
          <h1>Olá, {usuario.nome.split(' ')[0]}</h1>
          <p className={styles.subtitulo}>Bem-vindo à sua área pessoal no Hotel Sereno.</p>
        </div>
        <Button as={Link} to="/buscar" variant="primary">
          Nova reserva
        </Button>
      </header>

      {status === 'carregando' && <Spinner label="Carregando sua conta..." />}

      {status === 'erro' && (
        <Alert
          tone="danger"
          title="Não foi possível carregar sua conta"
          action={
            <Button type="button" variant="ghost" size="sm" onClick={recarregar}>
              Tentar novamente
            </Button>
          }
        />
      )}

      {status === 'pronto' && (
        <>
          <div className={styles.estatisticas}>
            <div>
              <span>Reservas confirmadas</span>
              <strong>{confirmadas}</strong>
            </div>
            <div>
              <span>Pagamentos pendentes</span>
              <strong>{pendentes}</strong>
            </div>
            <div>
              <span>Total pago (simulado)</span>
              <strong>{formatarMoeda(totalGasto)}</strong>
            </div>
          </div>

          {proxima ? (
            <section className={styles.destaque}>
              <div>
                <Badge tone="success">Próxima hospedagem</Badge>
                <h2>{quartosPorId[proxima.quartoId]?.nome ?? 'Acomodação'}</h2>
                <p>
                  {formatarData(proxima.dataInicio)} a {formatarData(proxima.dataFim)} ·{' '}
                  {proxima.quantidadePessoas} hóspedes
                </p>
                <p className={styles.codigo}>Código {proxima.codigo}</p>
              </div>
              <img
                src={quartosPorId[proxima.quartoId]?.imagens?.[0]}
                alt={quartosPorId[proxima.quartoId]?.nome ?? 'Acomodação'}
              />
              <Button as={Link} to={`/minha-conta/reservas/${proxima.id}`} variant="light" size="sm">
                Ver detalhes
              </Button>
            </section>
          ) : (
            <EmptyState
              title="Nenhuma hospedagem futura"
              description="Quando você confirmar uma reserva, ela aparecerá aqui."
              action={
                <Button as={Link} to="/buscar" variant="ghost" size="sm">
                  Consultar disponibilidade
                </Button>
              }
            />
          )}

          <section>
            <div className={styles.secaoTitulo}>
              <h2>Histórico recente</h2>
              <Link to="/minha-conta/reservas">Ver todas</Link>
            </div>
            {reservas.length === 0 ? (
              <EmptyState title="Nenhuma reserva ainda" description="Sua primeira estadia começa com uma busca." />
            ) : (
              <div className={styles.lista}>
                {reservas.slice(0, 2).map((reserva) => (
                  <ReservationCard key={reserva.id} reserva={reserva} quarto={quartosPorId[reserva.quartoId]} />
                ))}
              </div>
            )}
          </section>

          <section className={styles.atalhos}>
            <Link to="/minha-conta/perfil">Editar meus dados</Link>
            <Link to="/avaliacoes">Ver avaliações</Link>
            <Link to="/contato">Falar com o hotel</Link>
          </section>
        </>
      )}
    </div>
  )
}

export default AccountHome
