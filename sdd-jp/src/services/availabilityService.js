import api from './api.js'
import { listarAcomodacoes } from './accommodationService.js'

const STATUS_INATIVOS = new Set(['CANCELADA'])

export function sobrepoePeriodo(reserva, inicio, fim) {
  if (STATUS_INATIVOS.has(reserva.status)) return false
  return reserva.dataInicio < fim && reserva.dataFim > inicio
}

export async function listarReservasAtivas() {
  const { data } = await api.get('/reservas')
  return data.filter((reserva) => !STATUS_INATIVOS.has(reserva.status))
}

export function quartoDisponivel(quarto, reservas, inicio, fim) {
  return !reservas.some(
    (reserva) => reserva.quartoId === quarto.id && sobrepoePeriodo(reserva, inicio, fim),
  )
}

export async function verificarDisponibilidade(quartoId, inicio, fim) {
  const reservas = await listarReservasAtivas()
  return !reservas.some((reserva) => reserva.quartoId === quartoId && sobrepoePeriodo(reserva, inicio, fim))
}

export async function buscarDisponiveis({ inicio, fim, adultos = 1, criancas = 0, quartos = 1 }) {
  const [acomodacoes, reservas] = await Promise.all([listarAcomodacoes(), listarReservasAtivas()])
  const hospedes = Number(adultos) + Number(criancas)
  const capacidadeNecessaria = Math.ceil(hospedes / Math.max(1, Number(quartos)))

  return acomodacoes
    .filter((quarto) => quarto.capacidadeMaxima >= capacidadeNecessaria)
    .map((quarto) => ({
      ...quarto,
      disponivel: quartoDisponivel(quarto, reservas, inicio, fim),
    }))
    .filter((quarto) => quarto.disponivel)
}

export async function anotarDisponibilidade(acomodacoes, inicio, fim) {
  const reservas = await listarReservasAtivas()
  return acomodacoes.map((quarto) => ({
    ...quarto,
    disponivel: quartoDisponivel(quarto, reservas, inicio, fim),
  }))
}
