import { useCallback, useEffect, useMemo, useState } from 'react'
import { listarAcomodacoes } from '../services/accommodationService.js'
import { listarReservasDoUsuario } from '../services/reservationService.js'

export function useMinhasReservas(usuarioId) {
  const [reservas, setReservas] = useState([])
  const [quartos, setQuartos] = useState([])
  const [status, setStatus] = useState('carregando')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    if (!usuarioId) return undefined
    Promise.all([listarReservasDoUsuario(usuarioId), listarAcomodacoes()])
      .then(([reservasApi, quartosApi]) => {
        if (!ativo) return
        setReservas(reservasApi)
        setQuartos(quartosApi)
        setStatus('pronto')
      })
      .catch(() => {
        if (ativo) setStatus('erro')
      })
    return () => {
      ativo = false
    }
  }, [usuarioId, tentativa])

  const quartosPorId = useMemo(
    () => Object.fromEntries(quartos.map((quarto) => [quarto.id, quarto])),
    [quartos],
  )

  const recarregar = useCallback(() => {
    setStatus('carregando')
    setTentativa((valor) => valor + 1)
  }, [])

  return { reservas, quartosPorId, status, recarregar }
}
