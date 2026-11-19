import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/atoms/Alert/Alert.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import EmptyState from '../../components/atoms/EmptyState/EmptyState.jsx'
import Spinner from '../../components/atoms/Spinner/Spinner.jsx'
import ReservationCard from '../../components/molecules/ReservationCard/ReservationCard.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useMinhasReservas } from '../../hooks/useMinhasReservas.js'
import { hojeISO } from '../../utils/date.js'
import styles from './AccountPages.module.css'

const ABAS = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'proximas', rotulo: 'Próximas' },
  { id: 'andamento', rotulo: 'Em andamento' },
  { id: 'concluidas', rotulo: 'Concluídas' },
  { id: 'canceladas', rotulo: 'Canceladas' },
]

function AccountReservations() {
  const { usuario } = useAuth()
  const { reservas, quartosPorId, status, recarregar } = useMinhasReservas(usuario.id)
  const [aba, setAba] = useState('todas')

  const filtradas = useMemo(() => {
    const hoje = hojeISO()
    return reservas.filter((reserva) => {
      if (aba === 'todas') return true
      if (aba === 'canceladas') return reserva.status === 'CANCELADA'
      if (reserva.status === 'CANCELADA') return false
      if (aba === 'proximas') return reserva.status === 'CONFIRMADA' && reserva.dataInicio > hoje
      if (aba === 'andamento') return reserva.status === 'CONFIRMADA' && reserva.dataInicio <= hoje && reserva.dataFim >= hoje
      return reserva.dataFim < hoje
    })
  }, [reservas, aba])

  return (
    <div className={styles.stack}>
      <header className={styles.topo}>
        <div>
          <p className={styles.eyebrow}>Minhas reservas</p>
          <h1>Suas hospedagens</h1>
          <p className={styles.subtitulo}>Acompanhe solicitações, pagamentos e estadias.</p>
        </div>
      </header>

      <div className={styles.abas} role="tablist" aria-label="Filtrar reservas">
        {ABAS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={aba === item.id}
            className={aba === item.id ? styles.abaAtiva : styles.aba}
            onClick={() => setAba(item.id)}
          >
            {item.rotulo}
          </button>
        ))}
      </div>

      {status === 'carregando' && <Spinner label="Carregando reservas..." />}

      {status === 'erro' && (
        <Alert
          tone="danger"
          title="Não foi possível carregar suas reservas"
          action={
            <Button type="button" variant="ghost" size="sm" onClick={recarregar}>
              Tentar novamente
            </Button>
          }
        />
      )}

      {status === 'pronto' && (
        filtradas.length === 0 ? (
          <EmptyState
            title="Nenhuma reserva nesta categoria"
            description="Explore as acomodações disponíveis para planejar sua próxima estadia."
            action={
              <Button as={Link} to="/buscar" variant="ghost" size="sm">
                Buscar hospedagem
              </Button>
            }
          />
        ) : (
          <div className={styles.lista}>
            {filtradas.map((reserva) => (
              <ReservationCard key={reserva.id} reserva={reserva} quarto={quartosPorId[reserva.quartoId]} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default AccountReservations
